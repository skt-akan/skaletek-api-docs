# Page templates and authoring rules

Copy a template into the right section, rename it, and fill it in. The normative rules are in `references/SPEC-documentation.md`; this file is the short version. Not published.

## Front matter (§5.1)

```yaml
---
title: "Reading an alert explanation"        # H1 and SEO title, sentence case
description: "120–155 characters, plain language, says what the reader gets."
type: how-to          # tutorial | how-to | concept | reference | glossary | case-study | capability | release-note
tracks: [operations]  # one or more of: operations, configure, build
availability: ga      # ga | preview | coming-soon | hidden
owner: docs           # accountable person or team
last_reviewed: 2026-10-20
example_chapter: tutorial/an-alert-explained   # optional
glossary_terms: [alert, rule]                  # optional
help_keys: [alerts.explanation]                # optional, in-product help keys served
feature_keys: [monitoring]                     # optional, plan catalog feature keys
tag: "Preview"        # only when availability is preview: shows a sidebar tag
---
```

`npm run check` validates the required fields.

## Released vs preview (decision for the October demos)

| Area | `availability` |
| --- | --- |
| Monitoring (templates, rules), alerts, screening and lists, entities and Customer 360°, onboarding (KYB), cases (list, detail, escalation, closing), reporting | `ga` |
| Regulatory compliance, AI assistant ({AGENT}), signup / trial / starter packs / spreadsheet upload, plans and billing | `preview` + `<PreviewNotice />` |
| No screen in the product yet: parameters (thresholds you set) as a configurable screen, testing rules on past data (simulation), shadow mode, patterns library, opening a case from an alert, case decisions (proposing and recording a suspicion decision, task checklist from a case template), examiner export, audit log | `preview`: a page about one of these gets `availability: preview`; a section gets `<PreviewNotice />` at its start (at most two per page, combine beyond that); a one-line mention gets " (preview)"; glossary "In the product" lines start with "Preview." |

## Components (`/snippets/components.jsx`)

```mdx
import { AGENT, PageMeta, LifecycleStepper, ExampleNote, PreviewNotice, TryIt, KeyTakeaway, Important, Screenshot } from "/snippets/components.jsx";

<PageMeta tracks={["operations"]} minutes={4} availability="ga" />   // top of every page
<LifecycleStepper current="monitor" />    // Guides pages: onboard | screen | monitor | investigate | report | comply
<ExampleNote />                           // once, on pages that use the remittance example
<PreviewNotice feature="Regulatory compliance" />
<Screenshot name="alerts-explanation-open" alt="What the image shows and why it matters" />
```

`{AGENT}` renders the assistant's name. Never type the name.

## Callouts (§5.3): this fixed set only, at most three per screen

| Spec callout | Use |
| --- | --- |
| Note | `<Note>` |
| Tip | `<Tip>` |
| Important (compliance consequence) | `<Important>` |
| Warning (irreversible action) | `<Warning>` |
| For developers (collapsed) | `<Accordion title="For developers" icon="code">` |
| Key takeaway | `<KeyTakeaway>` |
| Try it | `<TryIt>` |

## Hard rules

- **Confidentiality (§7).** No internal service, database, queue, hosting or vendor names; no detection, matching or scoring internals; no AI model, provider, prompt or orchestration details; no internal identifiers or error codes outside the public API; no unreleased roadmap.
- **Compliance & Operations pages have no code blocks or JSON** in the body. Put technical detail in a "For developers" accordion that links to the Developers page.
- **Configure pages:** UI path first; the API equivalent second, in a tab.
- **Running example:** only the cast and data in `remittance-example.md`. Relative dates. Sample identifiers only.
- **Voice (§6):** second person, present tense, active voice, sentences under 20 words on average, paragraphs of four sentences or fewer. Bold UI labels exactly as in the product: **Alerts** › **Open in case**. No "seamless", "unparalleled" or other value adjectives: show it with the example.
- **Terms:** one term per concept, as in the glossary. Expand abbreviations at first use per page: "suspicious transaction report (STR)". Keep official French regulatory names (CENTIF, BCEAO, _déclaration de soupçon_) with an English gloss.
- **Headings** in sentence case. One H1 (the title). A page answers one question.
- **Related** block at the end: at most five curated links.
