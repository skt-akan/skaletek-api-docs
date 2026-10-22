# EN ↔ FR term table

The maintained term table of SPEC-documentation §6.4. It drives the French translation (§13.2), the style linter (§14.4) and the glossary (`glossary/index.mdx`). One row per glossary term, in the glossary's order, plus a few words from the running example. Changes need review by the compliance owner (§15.1).

Not published (`templates/` is in `.mintignore`).

Rows marked **(verify)** are first proposals that a fluent compliance reader must confirm before the French pages are published.

## Rules for translators

- Use the preferred FR term every time. Do not alternate with synonyms for style.
- Keep official French regulatory names as they are: BCEAO, CENTIF, *déclaration de soupçon*, RCCM, NINEA, UEMOA.
- UI labels in bold follow the French product UI exactly, not this table, when they differ. Report any mismatch.
- Numbers and currency in French format: `4 950 000 XOF`.
- Never translate or type the assistant's name: keep `{AGENT}`.
- Abbreviations: expand at first use per page, in French: « déclaration de soupçon (DOS) ».

## Glossary terms

| Preferred EN | Preferred FR | Avoid (EN) | Avoid (FR) | Notes |
| --- | --- | --- | --- | --- |
| action | action | rule outcome, trigger | déclencheur | What a rule does when it matches. |
| alert | alerte | hit, flag, notification | signalement, hit | |
| alert explanation | explication de l'alerte | evidence, explainability, reason codes | explicabilité, justification | |
| alert vs case | alerte / dossier d'enquête | | | Comparison entry. |
| anti-money laundering and countering the financing of terrorism (AML/CFT) | lutte contre le blanchiment de capitaux et le financement du terrorisme (LBC/FT) | AML/CTF, anti-money laundering alone when CFT is meant | LAB/FT, anti-blanchiment | |
| API key | clé d'API | access key, token, secret | clé API, jeton | |
| beneficial owner (UBO) | bénéficiaire effectif | ultimate owner, UBO alone at first use | propriétaire réel, ayant droit économique | |
| case | dossier d'enquête (then: dossier) | investigation case (after first use), ticket, file | cas, affaire, ticket | |
| cash or threshold declaration (CTR) | déclaration des opérations en espèces **(verify)** | cash transaction report as the main term, CTR alone at first use | déclaration de seuil **(verify)** | Check the official UEMOA / CENTIF wording. |
| change package | lot de modifications **(verify)** | change set, update bundle | paquet de changements, package | |
| customer due diligence (CDD) | mesures de vigilance à l'égard de la clientèle | due diligence alone, KYC as a synonym | diligence raisonnable, due diligence | |
| disposition | décision sur la correspondance **(verify)** | resolution, verdict | disposition, statut de traitement | Screening match only. |
| enhanced due diligence (EDD) | mesures de vigilance renforcées | enhanced checks | diligence renforcée | |
| entity (customer profile) | entité (profil client) | entity record, database row, customer 360 as a noun | fiche entité, enregistrement | Prefer "customer profile" in running text. |
| event | événement | transaction record, payload, message | enregistrement, charge utile | Use "transfer" (*transfert*) inside the story. |
| event status | statut de l'événement | workflow state | état de l'événement | |
| examiner export | export pour l'inspection **(verify)** | audit dump, data export | export d'audit, extraction | |
| external reference | référence externe | client ID, external ID | identifiant externe | |
| false positive | faux positif | non-match, cleared hit | fausse alerte | |
| financial intelligence unit (FIU) | cellule de renseignement financier (CRF); in Senegal, CENTIF | FIA, regulator (when the FIU is meant) | régulateur (when the FIU is meant) | CENTIF expands to Cellule Nationale de Traitement des Informations Financières. |
| know your business (KYB) | KYB (connaissance des entreprises clientes) **(verify)** | business KYC, KYC for companies | KYC entreprise | |
| know your customer (KYC) | connaissance du client (KYC) | identity check alone | vérification d'identité alone | |
| KYC vs KYB | KYC / KYB | | | Comparison entry. |
| label | étiquette | tag, flag | tag, marqueur, drapeau | |
| lineage | provenance des données **(verify)** | data lineage graph | lignage, lignée | |
| list | liste | managed list (after first use), watchlist for non-screening lists | liste gérée | |
| money laundering reporting officer (MLRO) | responsable LBC/FT; correspondant CENTIF where that is the official role **(verify)** | AML officer, MLRO alone at first use | déclarant (unless official) | |
| obligation | obligation | requirement as the main term, control | exigence, contrôle | |
| org unit | unité organisationnelle | organization (ambiguous with business customers), tenant | organisation, entité (ambiguous) | |
| parameter | paramètre | config value, variable | valeur de configuration, variable | First use: "threshold you can set" / « seuil que vous définissez ». |
| pattern | motif de détection **(verify)** | recipe, primitive, function | modèle (reserved for template), schéma | |
| politically exposed person (PEP) | personne politiquement exposée (PPE) | | PEP in French text | |
| quarantine | quarantaine | rejected events, error queue | file d'erreurs, rejet | |
| risk-based approach | approche fondée sur les risques | RBA alone | approche par les risques | |
| role | rôle | slot, field group | emplacement | Not a user role (permissions): say "user role" / « rôle utilisateur » for those. |
| rule | règle | scenario, detection logic, predicate | scénario, prédicat | |
| sanctions screening | criblage des sanctions | name matching, filtering | filtrage, screening | |
| screening match | correspondance de criblage | hit, potential hit | hit, alerte de criblage | |
| severity | gravité | priority, criticality | sévérité, priorité | Levels: low / faible, medium / moyenne, high / élevée, critical / critique. |
| shadow mode | mode observation **(verify)** | silent mode, test mode, dry run | mode fantôme, mode shadow, mode silencieux | Opposite: live mode / mode actif. |
| starter pack | pack de démarrage | template pack, bundle | kit de démarrage, package | |
| STR vs SAR | DOS / SAR | | | Comparison entry. |
| structuring | fractionnement | smurfing | schtroumpfage | |
| suspicious transaction report (STR) | déclaration de soupçon (DOS) | SAR (except when comparing), suspicious activity report | déclaration d'opération suspecte, rapport de soupçon | |
| template | modèle d'événement (then: modèle) | schema, event type, form | schéma, gabarit | |
| test on past data (simulation) | test sur données historiques (simulation) | backtest, replay | backtest, rejeu | |
| traceability | traçabilité | audit trail as the main term | piste d'audit as the main term | |
| transaction monitoring | surveillance des transactions | TM, transaction screening | monitoring des transactions, suivi des transactions | |
| true match | correspondance avérée **(verify)** | true hit, positive | vrai positif, hit confirmé | UI disposition label: **Confirmed match**; take the French UI label. |
| webhook | webhook | callback, push notification | rappel, notification push | |

## Story and product words

| Preferred EN | Preferred FR | Avoid (EN) | Avoid (FR) | Notes |
| --- | --- | --- | --- | --- |
| transfer | transfert | transaction (in the story), remittance as a count noun | virement, envoi | |
| sender / recipient | expéditeur / bénéficiaire | payer / payee, receiver | émetteur / destinataire | Do not confuse *bénéficiaire* with *bénéficiaire effectif* (beneficial owner). |
| payout agent | agent payeur | cash point, partner shop | point de retrait | |
| declaration threshold | seuil de déclaration | reporting ceiling | plafond de déclaration | |
| audit log | journal d'audit | activity log, history | historique, logs | |
| AI assistant (generic), `{AGENT}` (name) | assistant IA, `{AGENT}` | bot, copilot, agent, AI model | robot, copilote, agent IA | Never name a model or provider. |
| human in the loop | validation humaine | manual override | humain dans la boucle | |
| customer profile | profil client | entity record | fiche client | |
