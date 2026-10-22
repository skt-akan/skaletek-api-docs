// Builds api-docs/openapi.json from the source spec in skalemon-api/core/api/.
//
// Redocly resolves the cross-file $refs, which Mintlify cannot read. This script then narrows the
// result to the public surface and applies the changes that only make sense for the published
// docs: an absolute server URL and readable group names.
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
// The sibling checkout is either the repo itself or a workspace folder that contains it.
const source = [
  join(root, "..", "skalemon-api", "core", "api"),
  join(root, "..", "skalemon-api", "skalemon-api", "core", "api"),
].find((dir) => existsSync(dir));
if (!source) throw new Error("Source spec not found: check out skalemon-api next to this repo.");
const out = join(root, "openapi.json");

// Placeholder until a public base URL exists. Keep in sync with variables.baseUrl in docs.json.
const SERVER_URL = "https://api.skaletek.example/api/v1";
const TITLE = "Skaletek API V2";

// The public surface: an operation is published only if it carries one of these tags. Mintlify
// names each API reference group after the operation's first tag, hence the display names.
const TAG_NAMES = {
  health: "Health",
  "base-types": "Base types",
  "status-types": "Status types",
  templates: "Templates",
  events: "Events",
  entities: "Entities",
  labels: "Labels",
  rules: "Rules",
  patterns: "Patterns",
  alerts: "Alerts",
  webhooks: "Webhooks",
  lists: "Lists",
  screening: "Screening",
  reporting: "Reporting",
  graph: "Graph",
  ekyb: "eKYB",
};

// Operations that carry a public tag but are not part of the public surface.
const EXCLUDED_OPERATIONS = new Set([
  "getEnvironment",
  // Templates are authored in the dashboard; the API reference only covers reading them.
  "createTemplate",
  "updateTemplate",
  "deleteTemplate",
  "createTemplateDraft",
  "setTemplateStatus",
]);

// Customers authenticate with an API key from their dashboard. Sign-in, tokens and key management
// (the "auth" and "api-keys" tags) are deliberately left out, along with the bearer scheme.
const SECURITY_SCHEME = "APIKeyAuth";

// The source spec's discriminator mappings name schemas as "<domain>_api_<Schema>", which is
// what the Go runtime calls them after it merges the sub-specs. Those names do not exist in the
// files themselves, so bundle from a copy with the prefix stripped.
const work = mkdtempSync(join(tmpdir(), "skalemon-spec-"));
try {
  cpSync(source, work, { recursive: true, filter: (src) => !src.endsWith(".go") });
  for (const entry of readdirSync(work, { recursive: true })) {
    if (!entry.endsWith(".yaml")) continue;
    const file = join(work, entry);
    const text = readFileSync(file, "utf8");
    const fixed = text.replace(/#\/components\/schemas\/[a-z0-9]+_api_/g, "#/components/schemas/");
    if (fixed !== text) writeFileSync(file, fixed);
  }
  execFileSync(
    "npx",
    [
      "--yes",
      "@redocly/cli@2.60.0",
      "bundle",
      join(work, "openapi.yaml"),
      "-o",
      out,
    ],
    { cwd: root, stdio: "inherit" },
  );
} finally {
  rmSync(work, { recursive: true, force: true });
}

const spec = JSON.parse(readFileSync(out, "utf8"));
const methods = ["get", "post", "put", "patch", "delete"];

spec.info.title = TITLE;
spec.security = [{ [SECURITY_SCHEME]: [] }];
spec.components.securitySchemes = {
  [SECURITY_SCHEME]: spec.components.securitySchemes[SECURITY_SCHEME],
};
spec.servers = [{ url: SERVER_URL }];

for (const [path, item] of Object.entries(spec.paths)) {
  for (const method of methods) {
    const op = item[method];
    if (!op) continue;
    const isPublic = (op.tags ?? []).some((t) => t in TAG_NAMES);
    if (!isPublic || EXCLUDED_OPERATIONS.has(op.operationId)) delete item[method];
  }
  if (!methods.some((m) => item[m])) delete spec.paths[path];
}

const isComponentRef = (v) => typeof v === "string" && v.startsWith("#/components/");

// Mintlify rejects a document containing any "$ref" that is not internal, including one inside
// an example payload. Examples of template JSON Schema use type URNs there, and renaming the key
// would make them wrong, so those examples are left out of the published bundle.
const hasForeignRef = (node) => {
  if (Array.isArray(node)) return node.some(hasForeignRef);
  if (node === null || typeof node !== "object") return false;
  return Object.entries(node).some(([key, value]) =>
    key === "$ref" && typeof value === "string" ? !isComponentRef(value) : hasForeignRef(value),
  );
};
let droppedExamples = 0;
const dropForeignExamples = (node) => {
  if (Array.isArray(node)) return node.forEach(dropForeignExamples);
  if (node === null || typeof node !== "object") return;
  if ("example" in node && hasForeignRef(node.example)) {
    delete node.example;
    droppedExamples++;
  }
  if (node.examples && typeof node.examples === "object" && !Array.isArray(node.examples)) {
    for (const [name, example] of Object.entries(node.examples)) {
      if (!hasForeignRef(example)) continue;
      delete node.examples[name];
      droppedExamples++;
    }
    if (Object.keys(node.examples).length === 0) delete node.examples;
  }
  Object.values(node).forEach(dropForeignExamples);
};

// Drop components nothing public refers to any more, so console-only schemas are not published.
const collectRefs = (node, refs) => {
  if (Array.isArray(node)) return node.forEach((n) => collectRefs(n, refs));
  if (node === null || typeof node !== "object") return;
  for (const [key, value] of Object.entries(node)) {
    if (key === "$ref" && isComponentRef(value)) refs.add(value);
    else if (key === "mapping" && value && typeof value === "object") {
      Object.values(value).filter(isComponentRef).forEach((v) => refs.add(v));
    } else collectRefs(value, refs);
  }
};
dropForeignExamples(spec);

const reachable = new Set();
const queue = [{ ...spec, components: undefined }];
while (queue.length > 0) {
  const refs = new Set();
  collectRefs(queue.pop(), refs);
  for (const ref of refs) {
    if (reachable.has(ref)) continue;
    reachable.add(ref);
    const [, , kind, name] = ref.split("/");
    const target = spec.components?.[kind]?.[name];
    if (target === undefined) throw new Error(`unresolved reference ${ref}`);
    queue.push(target);
  }
}
for (const [kind, entries] of Object.entries(spec.components)) {
  if (kind === "securitySchemes") continue;
  for (const name of Object.keys(entries)) {
    if (!reachable.has(`#/components/${kind}/${name}`)) delete entries[name];
  }
}

// Mintlify uses the summary as the page title and file name, so every operation needs a short
// one. Until the source spec has them throughout, derive one from the operationId when missing,
// and move an overlong summary into the description.
const MAX_SUMMARY = 100;
function tidySummary(op) {
  const original = (op.summary ?? "").replace(/\s+/g, " ").trim();
  let summary = original.replace(/\s*\(SPEC §[^)]*\)/g, "");
  if (!summary) {
    const words = op.operationId.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();
    summary = (words[0].toUpperCase() + words.slice(1)).replace(/\bapi\b/g, "API");
  } else if (summary.length > MAX_SUMMARY) {
    summary = summary.split(/ \(| — |\. /)[0];
    op.description = [original, op.description].filter(Boolean).join("\n\n");
  }
  if (summary.length > MAX_SUMMARY) {
    throw new Error(`${op.operationId}: summary is too long, shorten it in the source spec`);
  }
  op.summary = summary;
}

const used = new Set();
for (const item of Object.values(spec.paths)) {
  for (const method of methods) {
    const op = item[method];
    if (!op) continue;
    op.tags = op.tags.filter((t) => t in TAG_NAMES).map((t) => TAG_NAMES[t]);
    if (op.security?.length) {
      op.security = op.security.filter((s) => SECURITY_SCHEME in s);
      if (op.security.length === 0) delete op.security;
    }
    tidySummary(op);
    op.tags.forEach((t) => used.add(t));
  }
}
spec.tags = Object.values(TAG_NAMES)
  .filter((name) => used.has(name))
  .map((name) => ({ name }));

writeFileSync(out, JSON.stringify(spec, null, 2) + "\n");

const count = Object.values(spec.paths).reduce(
  (n, item) => n + methods.filter((m) => item[m]).length,
  0,
);
console.log(`openapi.json: ${count} operations in ${spec.tags.length} groups`);
if (droppedExamples > 0) {
  console.log(`left out ${droppedExamples} example(s) containing non-internal $ref values`);
}
