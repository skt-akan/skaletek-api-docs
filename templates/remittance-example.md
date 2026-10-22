# Remittance running example: canonical data

The single source for the Teranga Transfer story (SPEC-documentation §4, SPEC-self-serve-onboarding §9.2). Every page, screenshot and code sample uses exactly these names, identifiers and amounts. Adding cast or data needs a change to SPEC-documentation §4.3 first.

Not published (`templates/` is in `.mintignore`).

## Disclaimer

Every page that uses the example shows it once, with `<ExampleNote />`:

> Teranga Transfer and all people in this example are fictional. Regulatory thresholds are simplified for illustration; check the current texts.

## The company

| Fact | Value |
| --- | --- |
| Name | Teranga Transfer (fictional) |
| Business | Licensed money transfer company in Senegal |
| Corridors | France → Senegal, Italy → Senegal |
| Payout | Cash at partner agents, or mobile wallet |
| Supervisor | BCEAO (Banque Centrale des États de l'Afrique de l'Ouest) |
| Financial intelligence unit | CENTIF-GN. Product-owner decision: it is the authority available in the product; Senegal will be added later. Pages introduce it as "the financial intelligence unit set up for this example" and give no other reason. |
| Currency | XOF |
| Suspicious transaction report | STR, in French _déclaration de soupçon_ (DOS) |

## Cast

| Entity id | Name | Kind | Role in the story | Sample identifiers |
| --- | --- | --- | --- | --- |
| `ent_smp_0001` | **Aminata Sow** | Person, sender, Lyon (FR) | Onboarded with KYC through Teranga's app. Sends regularly to her brother Moussa. | Passport `SAMPLE-P-0001`, `aminata.sow@example.com` |
| `ent_smp_0002` | **Moussa Ndiaye** | Person, recipient, Dakar (SN) | Receives all five transfers. **Near match** on the sample sanctions list. | National ID `SAMPLE-CNI-0002`, wallet `SAMPLE-WALLET-0002` |
| `ent_smp_0003` | **Fatou Ba** | Person, sender, Milan (IT) | Recently onboarded. Sends to Moussa. | Passport `SAMPLE-P-0003`, `fatou.ba@example.com` |
| `ent_smp_0004` | **Cheikh Tall** | Person, sender, Paris (FR) | Recently onboarded. Sends to Moussa. | Passport `SAMPLE-P-0004`, `cheikh.tall@example.com` |
| `ent_smp_0005` | **Point Marché Tilène** | Organization, payout agent, Dakar (SN) | Partner agent onboarded with KYB. Pays most of Moussa's transfers in cash. | RCCM `SAMPLE-RCCM-0005`, NINEA `SAMPLE-NINEA-0005` |
| `ent_smp_0006` | **Ibrahima Fall** | Person, Dakar (SN) | Beneficial owner of Point Marché Tilène. Appears in the KYB ownership graph. | National ID `SAMPLE-CNI-0006` |

Moussa is Aminata's brother. Fatou and Cheikh have no stated relationship to Moussa; that is what makes the pattern worth a look.

No phone numbers are used in pages. If one is unavoidable, use the French range reserved for fiction (`+33 6 39 98 xx xx`).

## Configuration from the remittance starter pack

| Element | Value |
| --- | --- |
| Starter pack | **Remittance / money transfer** (key `remittance`) |
| Event template | _Remittance transfer_ (slug `remittance-transfer`). Roles: `sender` (person), `recipient` (person), `payout_agent` (organization, optional for wallet payouts), `transaction` (amount, fee, corridor origin and destination countries, payout method `cash` · `mobile_wallet` · `bank_account`, wallet number for wallet payouts) |
| Parameter | **Declaration threshold**: 5,000,000 XOF (simplified illustration) |
| Rule 1 | _Just below the declaration threshold, many senders to one recipient_: at least 3 transfers to the same recipient within 7 days, from at least 2 senders, each between 90% and 100% of the declaration threshold (4,500,000–5,000,000 XOF). Severity high, category AML. At most one alert per recipient per 7 days. |
| Rule 2 (optional chapter) | _Payout agent cash share spike_: cash payouts at one agent above its usual level. Needs 30 days of the agent's history, so it does not fire on the sample data. |
| Screening | A clearly labelled **sample sanctions list** with one fictional entry that nearly matches Moussa Ndiaye. |
| Report | Suspicious transaction report to CENTIF-GN. |
| Case template | AML suspicion review |

## The five transfers

Dates are always relative: "five transfers over six days". Never write calendar dates in pages.

| Reference | Event id | Day | Sender | Amount (XOF) | Payout | Corridor |
| --- | --- | --- | --- | --- | --- | --- |
| `SAMPLE-REMIT-0001` | `evt_smp_0001` | 1 | Aminata Sow | 4,750,000 | Cash at Point Marché Tilène | FR → SN |
| `SAMPLE-REMIT-0002` | `evt_smp_0002` | 2 | Fatou Ba | 4,600,000 | Mobile wallet `SAMPLE-WALLET-0002` | IT → SN |
| `SAMPLE-REMIT-0003` | `evt_smp_0003` | 3 | Cheikh Tall | 4,950,000 | Cash at Point Marché Tilène | FR → SN |
| `SAMPLE-REMIT-0004` | `evt_smp_0004` | 5 | Aminata Sow | 4,800,000 | Cash at Point Marché Tilène | FR → SN |
| `SAMPLE-REMIT-0005` | `evt_smp_0005` | 6 | Fatou Ba | 4,900,000 | Cash at Point Marché Tilène | IT → SN |

**Sending the transfers yourself (API, upload, manual entry):** the product rejects the `SAMPLE-` prefix on real submissions (SPEC-self-serve-onboarding §8.8). Code samples and "Try it with the API" tabs use `TT-REMIT-0001`…`TT-REMIT-0005` for the same five transfers. `SAMPLE-REMIT-…` is only for the built-in sample data and its screenshots.

Total: 24,000,000 XOF to Moussa in six days, from three senders, four of five paid in cash at the same agent. Each transfer alone stays under the 5,000,000 XOF declaration threshold.

French number format: `4 950 000 XOF`.

## Outcomes

| Object | Id | What happens |
| --- | --- | --- |
| Screening match | — | Moussa's name nearly matches the fictional sample-list entry. The analyst compares them side by side and clears it as a **false positive** with a reason (different date of birth and nationality). |
| Alert | `alt_smp_0001` | Rule 1 raises **exactly one** alert on Moussa when the third qualifying transfer arrives (`SAMPLE-REMIT-0003`: three transfers, three senders, all within 90–100% of the threshold). The 7-day limit stops further alerts; the later transfers appear on Moussa's profile and are gathered into the case. |
| Case | `cas_smp_0001` | Opened from the alert. {AGENT} gathers the linked transfers, the cleared screening match and profile facts, proposes tasks and drafts a summary with citations. The analyst reviews and edits. |
| Report | `rpt_smp_0001` | The MLRO (money laundering reporting officer) decides there is suspicion. An STR is drafted from the case, reviewed and filed with CENTIF-GN. The case closes with the report reference. |
| Regulatory change (chapter 11) | — | A **fictional** new instruction lowers the declaration threshold to 4,000,000 XOF. Regulatory news arrives, the obligation is updated, a change package proposes the new parameter value, testing on past transfers shows the impact, an admin activates it. Clearly label the instruction as fictional. |

> Verify the alert timing, field names and screen labels against the preview tenant before publishing screenshots or code. If the product differs, fix this sheet first, then the pages.

## Words to use

| Use | Not |
| --- | --- |
| transfer (in the story), event (in the product sense) | transaction record, payload |
| customer profile / entity profile | entity record, database row |
| threshold you can set (first use), then parameter | config value |
| test on past data (simulation) | backtest |
| {AGENT} via `{AGENT}` from `/snippets/components.jsx` | a hard-coded name |

## Identity verification (eKYC) examples

eKYC pages use the same cast. Teranga verifies its senders with eKYC before their first transfer. Use these values in requests and screenshots; never real identity documents.

| Person | `external_id` | Date of birth | Nationality | `jurisdiction` (verified from) | Email | Used for |
| --- | --- | --- | --- | --- | --- | --- |
| Aminata Sow | `TT-CUST-0001` | `1990-04-12` | `sn` | `fr` (Lyon) | `aminata.sow@example.com` | Hosted flow and quickstart (chapter 3 of the tutorial) |
| Cheikh Tall | `TT-CUST-0004` | `1987-11-23` | `sn` | `fr` (Paris) | `cheikh.tall@example.com` | API-only verification |
| Fatou Ba | `TT-CUST-0003` | `1994-02-08` | `sn` | `it` (Milan) | `fatou.ba@example.com` | Step-up liveness before a large transfer |

- `external_id` is Teranga's own customer number (`TT-CUST-…`). Country codes are lowercase.
- Session `metadata` example: `{"teranga_customer": "TT-CUST-0001"}`.
- Placeholders: KYC API `https://kyc.skaletek.example`, applicant flow `https://verify.skaletek.example`, partner redirect `https://teranga.example.com/kyc/done`.
- Ids in responses: `app_smp_0001` (applicant), `ses_smp_0001` (session), `ver_smp_0001` (API-only verification), evidence bundle `evb_smp_0001`, token `tok_smp_0001`, `session_jwt` shown as `eyJ…` (truncated).
- Test sessions (`is_demo: true`) show a fixed test identity ("Demo User", US passport) on the data review screen, whatever the applicant's real data. Screenshots of that screen must say they come from a test session.
