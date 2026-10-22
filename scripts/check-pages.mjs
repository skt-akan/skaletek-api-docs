// Checks every published page against the rules Mintlify does not enforce:
//   - required front matter and allowed values (SPEC-documentation §5.1)
//   - description length (§11.2)
//   - the confidentiality denylist in scripts/denylist.txt (§7.4), also applied to openapi.json
// Exits non-zero on any error so `npm run check` fails.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Never published: keep in sync with .mintignore.
const SKIP = new Set(["node_modules", "references", "templates", "scripts", "drafts", "snippets", ".git", ".claude"]);
const SKIP_FILES = new Set(["README.md", "CLAUDE.md", "AGENTS.md", "LICENSE.md", "CHANGELOG.md"]);

const TYPES = ["tutorial", "how-to", "concept", "reference", "glossary", "case-study", "capability", "release-note"];
const TRACKS = ["operations", "configure", "build"];
const AVAILABILITY = ["ga", "preview", "coming-soon", "hidden"];

function pages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return SKIP.has(name) ? [] : pages(path);
    return /\.mdx?$/.test(name) && !SKIP_FILES.has(name) ? [path] : [];
  });
}

// Minimal YAML front matter reader: `key: value` and `key: [a, b]` lines only.
function frontMatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (value.startsWith("[")) {
      value = value.slice(1, -1).split(",").map((v) => v.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    } else {
      value = value.replace(/^["']|["']$/g, "");
    }
    fields[kv[1]] = value;
  }
  return fields;
}

const denylist = readFileSync(join(root, "scripts", "denylist.txt"), "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .map((line) =>
    line.startsWith("cs:")
      ? { source: line.slice(3), re: new RegExp(line.slice(3), "g") }
      : { source: line, re: new RegExp(line, "gi") },
  );

function denied(text, allow = []) {
  const hits = [];
  for (const { source, re } of denylist) {
    for (const m of text.matchAll(re)) {
      if (allow.some((a) => m[0].toLowerCase() === a.toLowerCase())) continue;
      const line = text.slice(0, m.index).split("\n").length;
      hits.push(`line ${line}: "${m[0]}" (denylist: ${source})`);
    }
  }
  return hits;
}

const errors = [];
const warnings = [];

for (const path of pages(root)) {
  const file = relative(root, path);
  const text = readFileSync(path, "utf8");
  const fm = frontMatter(text);
  const fail = (msg) => errors.push(`${file}: ${msg}`);

  if (!fm) {
    fail("missing front matter");
    continue;
  }
  for (const key of ["title", "description", "type", "tracks", "availability", "owner", "last_reviewed"]) {
    if (!fm[key] || (Array.isArray(fm[key]) && fm[key].length === 0)) fail(`missing required field "${key}"`);
  }
  if (fm.type && !TYPES.includes(fm.type)) fail(`type "${fm.type}" is not one of ${TYPES.join(", ")}`);
  if (fm.availability && !AVAILABILITY.includes(fm.availability)) {
    fail(`availability "${fm.availability}" is not one of ${AVAILABILITY.join(", ")}`);
  }
  for (const t of [].concat(fm.tracks ?? [])) {
    if (!TRACKS.includes(t)) fail(`track "${t}" is not one of ${TRACKS.join(", ")}`);
  }
  if (fm.last_reviewed && !/^\d{4}-\d{2}-\d{2}$/.test(fm.last_reviewed)) fail("last_reviewed must be YYYY-MM-DD");
  if (fm.description && (fm.description.length < 120 || fm.description.length > 155)) {
    warnings.push(`${file}: description is ${fm.description.length} characters (target 120–155)`);
  }
  for (const hit of denied(text, [].concat(fm.denylist_allow ?? []))) fail(`confidentiality ${hit}`);
}

// Warnings for now: the fixes belong in the source spec, outside this repo.
for (const spec of ["openapi.json", "kyc-openapi.json"]) {
  for (const hit of denied(readFileSync(join(root, spec), "utf8"))) {
    warnings.push(`${spec}: confidentiality ${hit} (fix in the source spec, then npm run spec)`);
  }
}

for (const w of warnings) console.warn(`warning  ${w}`);
for (const e of errors) console.error(`error    ${e}`);
console.log(`${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
