# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Public product and API documentation for the Skaletek platform (event-driven fraud and AML monitoring), built with Mintlify. See also `AGENTS.md` for Mintlify basics and style preferences.

## Commands

```bash
npm run dev     # local preview at http://localhost:3000 (pinned mint CLI version)
npm run check   # mint validate + mint broken-links — run before committing
npm run spec    # regenerate openapi.json from ../skalemon-api/core/api/
KYC_SPEC_URL=<kyc openapi.json url or path> npm run spec:kyc   # regenerate kyc-openapi.json (eKYC partner API)
```

There are no tests; `npm run check` is the validation step.

## Architecture

- `docs.json` defines all navigation (tabs: Home, Developers, API reference). A new page is only visible once its path is added there. Root `quickstart.mdx` is a starter-kit leftover not in the navigation.
- **`openapi.json` is generated — never edit it by hand.** It is produced by `scripts/build-spec.mjs`, which reads the source spec from the sibling repo `../skalemon-api/core/api/` (must be checked out next to this repo). Mintlify renders the "Endpoints" group from it. Fix content problems (summaries, descriptions, examples) in the source spec, then rerun `npm run spec`.
- `build-spec.mjs` defines the public API surface:
  - `TAG_NAMES` — only operations with one of these tags are published; the value is the sidebar group name.
  - `EXCLUDED_OPERATIONS` — tagged operations deliberately kept private (e.g. template writes).
  - Only the `APIKeyAuth` scheme is published; auth/api-key management endpoints are excluded.
  - It strips the `<domain>_api_` prefix from schema refs, drops examples with non-internal `$ref`s (Mintlify rejects them), prunes unreachable components, and derives/shortens operation summaries (max 100 chars; a summary that is still too long fails the build).
- `kyc-openapi.json` is generated too, by `scripts/build-kyc-spec.mjs` from the KYC service's own OpenAPI document: only partner operations are published (applicant, reviewer, admin and catalog endpoints are excluded), and descriptions that describe internals are replaced in `TEXT_OVERRIDES`. eKYC docs live in `developers/ekyc/` and `guides/onboarding/`; their placeholders are `https://kyc.skaletek.example` (API) and `https://verify.skaletek.example` (applicant flow).
- The API base URL `https://api.skaletek.example/api/v1` is a placeholder. It is hard-coded in `SERVER_URL` in `build-spec.mjs`, `api-reference/introduction.mdx` and `developers/quickstart.mdx`; change all of them together when the real URL exists.
- `references/` holds internal product specs and PRDs (`SPEC*.md`, `ekyc/`, `ekyb/`, `UI-UX-REQUIREMENTS.md`). They are source material, not published pages. `references/SPEC-documentation.md` is the normative spec for these docs: information architecture, page templates, voice, glossary and the running example.

## Content rules (from `references/SPEC-documentation.md`)

- **Confidentiality (§7):** never document how the platform is built — no internal service/database/queue names, hosting or third-party vendor names, detection or scoring internals, AI model names/prompts/orchestration, internal identifiers or error codes not in the public API, or unreleased roadmap. Document only user-facing concepts, inputs/outputs, the public API and webhooks. `references/` is full of such internals; do not copy them into pages.
- **Running example (§4):** use the fictional remittance story (Teranga Transfer, Senegal, XOF) with its fixed cast and data. Describe dates relatively; use sample identifiers (`SAMPLE-REMIT-0001`, `evt_smp_…`, `ent_smp_…`, `example.com` emails). Never use real people, companies or sanctioned names.
- **Voice (§6):** second person, present tense, active voice, short sentences; bold UI labels exactly as shown in the product; prefer compliance-industry terms over system terms; expand abbreviations at first use per page; one term per concept, matching the glossary (`home/glossary.mdx`).
- Headings in sentence case.
