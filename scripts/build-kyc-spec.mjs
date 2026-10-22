// Builds kyc-openapi.json, the published KYC API reference, from the KYC service's OpenAPI document.
//
//   KYC_SPEC_URL=<url or path of the service's openapi.json> npm run spec:kyc
//
// The service spec covers four audiences: partners (API key), applicants (the verification flow,
// called by the hosted flow and the SDK), reviewers and admins (the dashboard). Only the partner
// surface is published. This script narrows the spec to them, regroups
// the operations for the sidebar, sets the placeholder server URL and replaces descriptions that
// talk about how the service is built.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "kyc-openapi.json");

// Placeholder until a public base URL exists. Also used in developers/ekyc/*.mdx.
const SERVER_URL = "https://kyc.skaletek.example";
const TITLE = "Skaletek KYC API";
const DESCRIPTION =
  "Verify the identity of people with Skaletek eKYC. Create applicants, start verification " +
  "sessions for the hosted flow or the mobile SDK, submit server-to-server verifications, " +
  "request step-up checks and read results. Authenticate every request with your Skaletek API " +
  "key in the `X-API-Key` header.";

// Published operations, grouped for the sidebar. The first matching path prefix wins.
const GROUPS = [
  ["/v1/applicants/{applicant_id}/sessions", "Sessions"],
  ["/v1/applicants", "Applicants"],
  ["/v1/sessions/{session_id}", "Sessions"],
  ["/v1/stepup", "Step-up"],
  ["/v1/uploads", "API-only verification"],
  ["/v1/verifications", "API-only verification"],
];
// The catalog (/v1/catalog/*) is left out until it accepts partner API keys. Its reason codes
// and document types are published by hand in developers/ekyc/reason-codes.mdx.
const PUBLIC_TAGS = new Set(["Partner"]);
const SECURITY_SCHEME = "PartnerApiKey";

// Descriptions in the service spec that describe internals. Replaced, never published as is.
const DESCRIPTION_OVERRIDES = {
  PartnerApiKey: "Your Skaletek API key. Create it in the dashboard under Settings › General Settings › Configurations › API keys.",
};

const source = process.env.KYC_SPEC_URL;
if (!source) throw new Error("Set KYC_SPEC_URL to the KYC service's openapi.json (URL or file path).");
const spec = /^https?:/.test(source)
  ? await (await fetch(source)).json()
  : JSON.parse(readFileSync(source, "utf8"));

const methods = ["get", "post", "put", "patch", "delete"];
const groupFor = (path) => GROUPS.find(([prefix]) => path === prefix || path.startsWith(`${prefix}/`))?.[1];

spec.info = { title: TITLE, version: spec.info.version, description: DESCRIPTION };
spec.servers = [{ url: SERVER_URL }];
spec.security = [{ [SECURITY_SCHEME]: [] }];
spec.components.securitySchemes = {
  [SECURITY_SCHEME]: {
    ...spec.components.securitySchemes[SECURITY_SCHEME],
    description: DESCRIPTION_OVERRIDES[SECURITY_SCHEME],
  },
};
delete spec.tags;

for (const [path, item] of Object.entries(spec.paths)) {
  for (const method of methods) {
    const op = item[method];
    if (!op) continue;
    const group = groupFor(path);
    if (!group || !(op.tags ?? []).some((t) => PUBLIC_TAGS.has(t))) {
      delete item[method];
      continue;
    }
    op.tags = [group];
    // The key is documented once, as the security scheme, not as a header on every operation.
    op.parameters = (op.parameters ?? []).filter((p) => !(p.in === "header" && /^x-api-key$/i.test(p.name)));
    if (op.parameters.length === 0) delete op.parameters;
  }
  if (!methods.some((m) => item[m])) delete spec.paths[path];
}

// Keep only the components the published operations reach.
const reachable = new Set();
const walk = (node) => {
  if (Array.isArray(node)) return node.forEach(walk);
  if (node === null || typeof node !== "object") return;
  for (const [key, value] of Object.entries(node)) {
    if (key === "$ref" && typeof value === "string" && value.startsWith("#/components/schemas/")) {
      const name = value.split("/").pop();
      if (!reachable.has(name)) {
        reachable.add(name);
        walk(spec.components.schemas[name]);
      }
    } else walk(value);
  }
};
walk(spec.paths);
for (const name of Object.keys(spec.components.schemas)) {
  if (!reachable.has(name)) delete spec.components.schemas[name];
}

// Wording in the service spec that describes how it is built, replaced field by field.
const TEXT_OVERRIDES = [
  [["paths", "/v1/applicants/{applicant_id}/sessions", "post", "description"],
    "Starts an interactive verification for the applicant with the chosen workflow. Build the applicant link from the returned `token` and `session_jwt`."],
  [["components", "schemas", "SessionCreated", "properties", "session_jwt", "description"],
    "Short-lived credential for this session only. It goes in the applicant link and cannot call partner endpoints."],
];
for (const [path, text] of TEXT_OVERRIDES) {
  const parent = path.slice(0, -1).reduce((node, key) => node?.[key], spec);
  if (!parent || !(path.at(-1) in parent)) throw new Error(`Override target missing: ${path.join(" › ")}`);
  parent[path.at(-1)] = text;
}

writeFileSync(out, `${JSON.stringify(spec, null, 2)}\n`);
const count = Object.values(spec.paths).reduce((n, item) => n + methods.filter((m) => item[m]).length, 0);
console.log(`kyc-openapi.json: ${count} operations, ${reachable.size} schemas`);
