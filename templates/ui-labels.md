# UI labels (internal reference, not published)

Exact user-facing labels of the Skaletek web app, recorded by browsing the test tenant on 2026-10-20 (English UI unless marked FR). Use these strings verbatim (bold) when docs name the UI. Labels are copied with the product's own capitalisation, which is not always sentence case.

Conventions in this file:

- Menu path uses `›`, for example **Configuration** › **Rules**.
- "Filter" = a pill-shaped dropdown in the filter bar above a table. "KPI tile" = a number tile above a table.
- Column headers are shown in the UI in UPPERCASE via CSS; the underlying label is given here as displayed.
- Sample data seen in the tenant (names, IDs, emails) is deliberately not reproduced.

## Global chrome

| Label | Where it appears | Notes |
| --- | --- | --- |
| (no visible labels) | Left rail, collapsed | Icon-only. No tooltips or aria-labels. Hovering the rail **expands it** to show the labels below. |
| **Acme** / **Business Portal** | Top of expanded rail | Tenant switcher (tenant name + "Business Portal"). Opens a menu with the current tenant tagged **Current** and a **Add tenant** button. |
| **Dashboard** | Rail, first item | `/dashboard` |
| **works** | Rail group heading | Literal lowercase "works" (looks like an untranslated key; also "works" in FR). Group holds Alerts, Verifications, Screening, Cases. Avoid quoting it in docs. |
| **Alerts** | Rail › works | `/alerts` |
| **Verifications** | Rail › works | `/verifications` (this is the onboarding / KYC-KYB area) |
| **Screening** | Rail › works | `/screening` |
| **Cases** | Rail › works | `/cases` |
| **Data** | Rail group heading | Holds Entities, Transactions & Events, Report. |
| **Entities** | Rail › Data | `/entities` |
| **Transactions & Events** | Rail › Data | `/events`. Page heading and tab say **Events**. |
| **Report** | Rail › Data | `/report` (singular in nav) |
| **Settings** | Rail group heading | Holds General Settings, Configuration, Need help?. |
| **General Settings** | Rail › Settings | `/settings` |
| **Configuration** | Rail › Settings | Has a chevron; click to expand sub-items: **Workflows**, **Templates**, **Watchlists**, **Rules**. Clicking the parent goes to `/workflow`. |
| **Workflows** | Rail › Settings › Configuration | `/workflow` |
| **Templates** | Rail › Settings › Configuration | `/templates` |
| **Watchlists** | Rail › Settings › Configuration | `/lists`. Page heading is **Lists**. |
| **Rules** | Rail › Settings › Configuration | `/rules` |
| **Need help?** | Rail › Settings | `/help`. Page is currently empty (search bar only). |
| User card (initials, display name, email, logout icon) | Bottom of rail | Click initials to see name/email and a logout icon. No profile menu items. |
| Search bar `Search <area> ⌘K` | Top bar, centre | Placeholder changes per page, e.g. "Search alerts ⌘K", "Search events ⌘K". |
| **Scheduled action center** (aria-label) | Top bar, calendar icon | Opens page `/scheduled-actions` titled **Scheduled action center**. |
| Theme toggle (moon icon) | Top bar | No label. |
| **En** | Top bar, globe button | Language switcher. Menu: **English**, **Français**. Shows **En** / **Fr**. |
| Preview banner | Below top bar on Dashboard | Preview banner present (purple), with a **View details** link; close button (X) at the far right end of the banner. Do not show in screenshots. |
| **Reload** | Most list pages, right of the filter bar | Refreshes the list. |
| **Previous** / **Next**, page numbers, rows-per-page select, "Showing 1 - 10 of N" | Bottom of tables | Standard pagination. |
| **Date** | Filter bar on several pages | Date-range picker button. |
| **Opps!** / **Nothing here** | Empty states | Typo "Opps!" is in the product. |
| **404** / **Page not found** / **Go to dashboard** | Unknown routes | |

## Dashboard

Path: rail **Dashboard** (`/dashboard`). Page heading **Dashboard**.

| Label | Where it appears | Notes |
| --- | --- | --- |
| **All-time**, **Today**, **Last 7 days**, **Last 14 days**, **Last 30 days**, **Last 90 days**, **Custom** | Date chips under the heading | Time range for the tiles. |
| **Events Today** | KPI tile 1 | Sub-text "Events increase by +N today vs Yesterday"; mini chart "Total event volume". |
| **Open Alerts** | KPI tile 2 | Sub-text "N resolved alerts (last 30d)"; mini chart "Total alert volume". |
| **Rule Fired** | KPI tile 3 | Sub-text "N rules fire in the last 4hr"; mini chart "Top triggering rules". |
| **Entities at Risk** | KPI tile 4 | Sub-text "N total tracked • N critical"; mini chart "Risk trend" (y-axis "Security rating"). |
| Expand icon (aria **Expand Events Today** etc.) | Each mini chart | Opens a large chart dialog with the same date chips and **Close**. |
| **Open Alerts** | Panel, bottom left | Button **See all**. Rows: rule name, severity badge, SLA state (e.g. **Breached** / "Time elapsed"). |
| **Recent Events** | Panel, bottom middle | Button **See all**. Rows: external reference, template version, date, status (e.g. **Pending**). |
| **High Risk Entities** | Panel, bottom right | Button **See all**. Rows: entity name, status badge **Active**, count, "Score: N". |

### Complete your account set up (checklist)

Floating card bottom right, title **Complete your account set up** with progress "5/7"; expands to a panel headed **Hello <first name>!** / "You should complete all steps to fully activate your account".

| Step label | Description shown | Button |
| --- | --- | --- |
| **Account created** | Your account is ready. | **Done** |
| **Set up your company** | Add some details about your company. | **Start** |
| **Create your first template** | Select from standard templates or create one from scratch. | **Done** / **Start** |
| **APIs & webhooks** | Create API keys and set your webhook & secrets. | **Done** / **Start** |
| **Configure a new rule** | Select from standard rules or create one from scratch. | **Done** / **Start** |
| **Add your team** | Invite teammates and assign them roles. | **Done** / **Start** |
| **Create a new tenant** | Add all your tenant businesses under your account. | **Start** |

## Alerts

Path: rail **Alerts** (`/alerts`). No page heading (search placeholder "Search alerts ⌘K").

| Label | Where it appears | Notes |
| --- | --- | --- |
| **Templates**, **Status**, **Severity**, **SLA**, **Entity**, **Rules**, **Country**, **Event status** | Filters | Plus a free-text box **Entity identifiers**. |
| **Open**, **Critical**, **SLA Breached**, **At risk**, **Resolved**, **Total** | KPI tiles | |
| ALERT, SLA, SCOPE, ENTITIES / FACTORS / IDENTIFIERS, TXNS, ANALYST, STATUS | Table columns | ENTITIES, FACTORS, IDENTIFIERS are three sub-columns. Entity role chip e.g. **Subject**. |

Alert statuses (Status filter and status badge): **Open**, **Acknowledged**, **Investigating**, **Resolved**, **Dismissed**.

Alert severities (Severity filter and badge): **Low**, **Medium**, **High**, **Critical**.

SLA states (SLA filter): **At risk**, **On track**, **Breached**. Row shows "Breached" + "Time elapsed".

Event status filter lists the status workflows: **Simple Workflow**, **Fraud Investigation**, **Claims Processing**, **Compliance Review**, **Report Lifecycle**.

### Alert detail

Path: **Alerts** › click a row (`/alerts/<id>`). Heading = rule title, sub-heading = rule description, back arrow.

| Label | Where it appears | Notes |
| --- | --- | --- |
| Status button (e.g. **Open** ▾) | Top right | Menu lists the other statuses: **Acknowledged**, **Investigating**, **Resolved**, **Dismissed**. This is how you change alert status. |
| History icon (aria **Status History**) | Left of status button | Opens **Status history** panel (columns Date / status / actor, e.g. "system"). |
| **Summary** | Left column | Fields: **Template** (link), **Severity**, **Event reference**, **Created on**, **Analyst**. |
| **Overview**, **Rule evaluation**, **Entities**, **Evidence**, **Transactions** | Tab bar (jumps to sections) | |
| **COUNTRY SCOPES**, **ENTITIES** (+ link **See roles & factors**), **TXNS** (+ link **View events**), **STATUS** | Overview tiles | |
| **Conditions the rule evaluated** | Section | Toggle **Graph** / **Tree**; result node "Rule matched" / "Raises a high alert". |
| **Entities & factors** | Section | Columns ENTITIES, FACTORS, IDENTIFIERS; button **Profile** opens the entity. |
| **Evidence** | Section | Link graph; legend **Anchor**, **Flagged**, **Shared identifier**. |
| **Related Transactions** | Section | Buttons **Reload**, **Export**; view toggle **Table** / **Timeline** / **Map**; **Factor** / **Context**; columns EVENT ID / REF, MONEY, ENTITIES/FACTORS/IDENTIFIERS, STATUS (e.g. **Flagged**). |

## Verifications (onboarding: people and organizations)

Path: rail **Verifications** (`/verifications`). Spec name "Onboarding" does not appear in the UI. Tabs **Individual** (with count) and **Company**.

### Individual tab

| Label | Where it appears | Notes |
| --- | --- | --- |
| **Date**, **Review Status**, **Session Status**, **Country** | Filters | Search "Search individual ⌘K". |
| NAME, KYC CHECKS, REVIEW STARTED, REVIEWED, SESSION, REVIEW STATUS | Columns | Name cell shows "Score:". KYC CHECKS shows e.g. "Session ongoing" or "Failed" + reason. |

Review Status values: **Pending**, **Approved**, **Rejected**.
Session Status values: **In progress**, **Pending review**, **Approved**, **Rejected**, **Expired**, **Abandoned**.

Individual detail (`/verifications/individual/<id>`): heading = person name, status badge (e.g. **Rejected**), buttons **Escalate**, status button, download icon (aria **Download evidence bundle**). Sections **Summary**, **Identity Document**, **Liveness Check**, **Liveness detection**, **Final decision** (result legend **Failed** / **Warning** / **Passed**). Tabs **Transactions**, **Device**, **Location**, **Activities** with sections **Transaction history**, **Device & IP Analysis**, **Location**, **Activity history** (columns EVENT, DETAILS, DATE). Activity entries include "Status change", "Verification started", "Artifact viewed" (opening a session logs a view).

### Company tab

| Label | Where it appears | Notes |
| --- | --- | --- |
| **Templates** | Top strip | KYB template cards; chips **Active**, **Draft**, **Archived**; button **New KYB template**. |
| **Company verifications** | List heading | Button **New KYB case** (opens `/verifications/company/new`). |
| **Relationship**, **Status** | Filters | Search "Search company ⌘K". |
| ORGANIZATION, LABEL, LAST MODIFIED, STATUS | Columns | |

KYB case statuses: **Draft**, **Collecting**, **Graph ready**, **Screening**, **In-review**, **Approved**, **Declined**, **Restricted**, **Refreshing**.
Relationship values: **Customer**, **Prospect**, **Supplier**, **Critical third party**, **Agent**, **Correspondent**, **Partner**, **Beneficiary**, **Guarantor**, **Public body**, **Non-profit**.

Company detail (`/verifications/company/<id>`): decision buttons **Restrict**, **Decline**, **Approve**, overflow menu. **Summary** fields: Registration Number, Registry, Regulator context, AML BO, Decision, Representative, Created on, Created by. Tabs **Company data**, **Ownership**, **KYC sessions**, **Screening**, **Documents**, **Form data**, **Location**, **Activities**. Buttons **Update information**, **Update ownership**, **View screening**, **View responses**. Sections **Submitted information**, **Ownership graph**, **AML Beneficial Ownership**, **50% sanction aggregate**, **Forms**, **Activity history**.

## Screening

Path: rail **Screening** (`/screening`).

| Label | Where it appears | Notes |
| --- | --- | --- |
| **Date**, **Run date**, **Status**, **Country**, **Trigger**, **Topics** | Filters | Search "Search screening ⌘K". |
| **New screening** | Primary button | Opens `/screening/new`. |
| ENTITY, DATE, THRESHOLD, TRIGGER, TOPICS, TARGET, SCORE, MATCHES, STATUS, RAN ON | Columns | No-hit rows show "No match" and status **Clean**. |

Screening status filter values (match dispositions): **False positive**, **Confirmed match**, **Pending**, **Escalated**. Row status for no hits: **Clean**.
Trigger values: **Rule**, **Manual**, **Alert**.
Topics values: **Sanctioned**, **Sanction linked**, **PEP**, **Close associate**, **Judge**, **Diplomat**, **Regulatory warning**, **Regulatory action**, **Crime**, **Fraud**, **Terrorism**, **Export control**, **Export risk**.

**New screening** page: tabs **Manual** / **Known Entity**; fields **Entity\***, **Percentage (1-100)\*** (placeholder "e.g 80"), **Full Name\***, **Date of Birth**, **Nationality**, **List**; list chips **Sanctions**, **PEP**, **Regulatory**, **Crime**, **Trade**, **Custom**; button **Start Screening**.

### Screening detail (match review)

Path: **Screening** › click a row (`/screening/<id>`). Header: entity name, status badge **Completed**, trigger (e.g. **Manual**), topic chip.

| Label | Where it appears | Notes |
| --- | --- | --- |
| **Screening results** | Left column | One card per potential match: name, topic badge, match % badge; fields **Names**, **Other names**, **Last names**, **Nationality**, **Date of Birth**, **Place of birth**, **Address**, **Gender**, **Citizenship**, **Source**; link **see more**. |
| **Details** | Right column | Empty state "No results available" / "No additional details found for this match". |
| **Mark as false positive** | Bottom right, green | Disposition button. |
| **Confirm match** | Bottom right, red | Disposition button. |
| **Escalate** | Bottom right, orange | Disposition button. |
| "No matches found" / "This screening returned no records above the confidence threshold" | Empty results | |

## Cases

Path: rail **Cases** (`/cases`).

| Label | Where it appears | Notes |
| --- | --- | --- |
| **Status**, **Severity** | Filters | Search "Search ⌘K". |
| **Sync alerts** | Button | |
| **Start new research** | Primary button | Opens **Research request** dialog: **Jurisdiction**, **Institution**, **Research focus** (Transaction monitoring thresholds, PEP due diligence, Cash reporting, Record retention), **Supporting document (optional)** / **Upload document** (PDF only), **Cancel**, **Run research**. |
| **Total cases**, **Escalated**, **Needs review**, **Auto-resolved**, **On hold** | KPI chips | |
| ALERT ID, CASE ID, SEVERITY, POLICY RULE, CONFIDENCE, STATUS | Columns | Status cell shows **Escalate** (verb), while the filter says **Escalated**. |

Case statuses (Status filter): **Escalated**, **In Review**, **Resolved**, **On hold**. Severities: **Critical**, **High**, **Medium**, **Low**.

Case detail (`/cases/<case id>`): heading = case ID, sub-heading = case title. **Summary** fields: Case ID, Alert, Severity, Risk level, Policy rule, Analyst, Generated by, Confidence (with "Threshold 70%"), **Case manager summary**. Sections **Why this happened**, **Recommended next steps** (checkboxes), **Activities** (timeline steps Regulation, Obligation extracted, Rule generated, Engine deployment, Alert triggered, Case created, Decision + report). CONFIDENTIALITY: this page shows AI model names and internal deployment notes. Do not screenshot or document those fields.

## Entities

Path: rail **Data** › **Entities** (`/entities`). No table; four leaderboard panels.

| Label | Where it appears | Notes |
| --- | --- | --- |
| **All directions**, **Status**, **All countries** | Filters | Search "Search ⌘K". |
| **Top 7**, **Top 20**, **Top 50** | Chips | Leaderboard size. |
| **Last week**, **Last month**, **Custom** | Chips | Period. |
| **Highest Velocity**, **Sum of Transactions**, **Most risk**, **Most Flags** | Panel headings | Rows: rank, name, status badge, metric, "Score: N"; label chip e.g. "KYC Pending". |

Entity statuses: **Active**, **Suspended**.

### Entity page

Path: **Entities** › click a name (`/entities/<id>?tab=details`). Header: name, risk badge (e.g. **Low**), **Add label**, entity ID; button **Screen entity**.

| Tab | Content / labels |
| --- | --- |
| **Details** | **Summary** (Type, Display Name, Email, First Name, Full Name, Last Name, Nationality, PEP Status, First seen, Last Seen, Appearances, RISK SCORE); **Appearances** table (EVENT ID / REF, RECEIVED AT, SOURCE, STATUS). |
| **Alerts** | Columns ALERT, RULE FIRED, ROLE, DATE, SEVERITY, STATUS. |
| **Explore** | Network graph; toggles **Events** / **Alerts**, **Value/Ref**, **All Risk**, **All time**; focal node tagged **Focal**. |

## Events

Path: rail **Data** › **Transactions & Events** (`/events`). Page heading **Events**. Tabs **Events** and **Quarantined** (with count).

| Label | Where it appears | Notes |
| --- | --- | --- |
| Status chips (e.g. **New**, **Received**, **Submitted**) with counts | Above table | Removable chips per status workflow (aria "Remove Simple Workflow" etc.). |
| **Status Type**, **Date**, **Templates** | Filters | Plus **Entity identifiers** box. Search "Search events ⌘K". |
| EVENT ID / REF, SCOPE, ENTITIES / MONEY FLOW / IDENTIFIERS, SOURCE, RULES TRIGGERED, STATUS | Columns | Event status examples: **Pending**, **Flagged**. Source shows the channel (e.g. API key, user). |

Status Type values: **Simple Workflow**, **Fraud Investigation**, **Claims Processing**, **Report Lifecycle**, **Compliance Review** (event statuses depend on the template's status workflow).

### Quarantined tab

Heading **Quarantined**. Search "Search quarantined ⌘K". Buttons **Retry all retriable**, **Dismiss selected**, overflow **More actions**. Columns EVENT ID / REF, RECEIVED AT, SOURCE, ERROR, STAGE, CODE, PATH, STATUS. CONFIDENTIALITY: STAGE/CODE values are internal validator codes; document only the concept (payload failed validation, field path).

### Event detail

Path: **Events** › click a row (`/events/<id>?tab=overview`). Header: template tags, status button (e.g. **Pending** ▾, menu shows next allowed statuses from the workflow). Tabs **Overview** / **Rule Evaluation**. Button **View event payload** (dialog **Payload**, **Copy**).

- **Summary** fields: ID, External Ref, Template, Occured At (typo in product), Received At, Source, Rule Fired, Countries.
- One section per role (e.g. **Applicant**, **Verification**), with "N fields are missing values".
- **Status History** (Date, status, actor).
- **Rule Evaluation** tab: **Rules executed**, **Rules matched**, **Reload**; columns ACTIVITIES, TRIGGER, OUTCOME.

## Report (regulatory reports)

Path: rail **Data** › **Report** (`/report`).

| Label | Where it appears | Notes |
| --- | --- | --- |
| **Status**, **Date**, **Report Type**, **Authority** | Filters | Search "Search report ⌘K". |
| **Create report** | Primary button | Dialog **New report**: pick a report definition (name, authority, trigger, method), **Cancel**, **Continue**. |
| Assign analyst (aria) | Table toolbar | |
| REPORT, ENTITY, AUTHORITY, TRIGGER, METHOD, DUE, CREATED ON, ANALYST, STATUS | Columns | |

Report statuses (filter): **Draft**, **Pending completion**, **Pending approval**, **Ready for submission**, **Submitted**, **Acknowledged**, **Accepted**, **Rejected**, **Amended**, **Cancelled**. (Table badges use Title Case, e.g. "Ready For Submission", "Pending Completion".)
Report Type: **Event triggered**, **Periodic**, **On demand**.
Method examples: **Portal (manual)**, **Email**, **File download**.
Authority entries show code + full name (e.g. BCEAO, CENTIF-GN, COBAC, CIMA, BOARD).

Report detail (`/report/<id>`): heading = report name, ID, trigger. Buttons **View activity**, **Reject**, **Accept**, **Download**. **Information** fields: Subject, Subject type, Authority, Submission method, Date range, Scheduled date, Total events, Total value. **Status history** timeline (one row per status, with file downloads at **Ready for submission**). **Events** table.
Draft report wizard (`/report/new/<id>`): sections **Report settings** (Entity, Date range), **Schedule report**, **Results**; buttons **Scan events**, **Scan results**, **Continue**.

## Scheduled action center

Path: top bar calendar icon (`/scheduled-actions`). Heading **Scheduled action center**.

Filters **Status**, **Owner**; toggles **Report only**, **Rule only**; panel **Upcoming schedules** with view toggle **Upcoming** / **Calendar** / **History**. Columns NEXT OCCURRENCE, TYPE (**Report** / **Rule**), NAME, OWNER, STATUS, ACTIONS. Statuses seen: **Overdue**, **Scheduled**, **Paused**.

## Settings

There are no groups named Monitoring, Reporting, Regulatory, Integrations, Billing or Administration in the product. Settings live in two places.

### General Settings (`/settings`)

Path: rail **Settings** › **General Settings**. Left sub-nav headed **All Tenant Settings** with two groups.

| Menu path | Screen heading | Labels |
| --- | --- | --- |
| **General Settings** › **Personal** › **Profile** | **Profile** ("Your organisation's information and branding") | Tenant ID; **Trading Name**, **Legal Name**, **Registration Number**, **Regulator Reference**, **Primary Jurisdiction**, **Website**, **Registered Address**; **Operating country** (**Country**); **Primary contact** (**Select member**); **Change password** (**New password**, **Confirm password**); **Save changes**. |
| **General Settings** › **Personal** › **Notifications** | **Notification channels** (**Email**, **In-app**); **Escalation schedule** (**High**, **Medium**, **Low**); **Alert contacts** (**Select member**, "Select a status to assign to member") | **Save changes** |
| **General Settings** › **Configurations** › **Compliance Configuration** | **SLA window by severity** ("Maximum time an open alert can run before breach triggers escalation.") | **High** / **Medium** / **Low** in **Hours**; **Save changes** |
| **General Settings** › **Configurations** › **Team Access** | Tabs **Teams** / **Members** | Teams: heading **Team**, button **Create team** (dialog: Team name, Access, Template, **Create team**); columns TEAM, ACCESS, TEMPLATE, LAST SEEN, STATUS. Members: heading **Team member**, button **Invite member** (dialog: First Name, Last Name, Email Address, Role, Access, **Invite**); columns MEMBER, ACCESS, LAST SEEN, STATUS. |
| **General Settings** › **Configurations** › **API keys** | **API keys** ("Create and manage API keys for your integrations") | Button **Create keys** (dialog **Create key**: Key name, Country codes, Permissions, Template, **Link all templates**, Expiry **30 days** / **90 days** / **1 year** / **No expiry**, **Create key**). Columns KEY, ACCESS, TEMPLATE, STATUS. Keys shown masked. |
| **General Settings** › **Configurations** › **Webhook** | **Webhook** ("Push real-time notifications to your systems when alerts fire, SAR filings complete, or entity risk changes.") | Button **Create webhook** opens a 3-step page: **Destination**, **Configure**, **Events**; destination types **HTTPS**, **Slack**, **Microsoft Teams**, **PagerDuty**, **Github**. Columns WEBHOOK, DESTINATION, EVENTS, STATUS. |

Member roles seen: **Admin**, **Compliance officer**, **Analyst**. Member statuses: **Active**, **Invite Sent**, **Inactive**. Team statuses: **Active**, **Archived**.

Not found anywhere (checked nav, settings sub-nav and likely routes): audit log, billing, simulation/shadow mode screen, regulatory settings, parameters/patterns screen. "shadow" appears only inside a rule name.

### Configuration (rail sub-menu)

| Menu path | Screen | Labels |
| --- | --- | --- |
| **Configuration** › **Workflows** (`/workflow`) | Verification workflows list | Filters **Period**, **Status**; button **Create workflow** (dialog **Select a template**: **Create from scratch** or a starter, e.g. API only, Document upload only, Full KYC, Liveness step-up, NFC-first KYC, Standard KYC). Columns NAME, KEY, STEPS INCLUDED, STATUS, SESSIONS, LAST MODIFIED. Statuses **Draft**, **Active**, **Deprecated**. Builder page: steps **Starting step**, **Intake**, **Document**, **Biometrics**, **Background checks**, **Outcome**, **Rule**; buttons **Preview flow**, **Save draft**, **Publish**. |
| **Configuration** › **Templates** (`/templates`) | Event templates | View toggle **Show as table** / **Show as board**; filters **Date**, **Status**; cards show roles and counts **Rules**, **Events**, **Alerts**. Statuses **Active**, **Draft**, **Deprecated**. Detail tabs **Overview**, **Roles**, **Rules**, **Integrations**; **Action** menu (**Activities**, **Disable template**, **Delete template**); Summary fields ID, Slug, Version, Status, Status Type, Parameters (**Update**); **Associated Events**. Integrations tab shows **Submission mode** (Unit / Batch / File), **Endpoint & authentication**, **Sample payload** (**Copy**, **Randomize**). |
| **Configuration** › **Watchlists** (`/lists`) | Heading **Lists**; tabs **Lists** / **Collections** | Filters **Kind**, **Status**, **Scope**; button **Create list** (dialog: Kind\* Entity/Country/Value, Key\*, Name\*, Description, Purpose\* **Block**/**Allow**/**Monitor**/**Regulatory**, **Continue**). Columns LIST, KIND, PURPOSE, ENTRIES, STATUS. Collections: **Create collection**; columns COLLECTION, LISTS, STATUS. Kind values (filter) **Country**, **Value** (list kinds also include **Entity**); Status **Draft**, **Active**, **Archived**; Scope **Platform**, **Tenant**. List detail: **Summary** (Kind, Purpose, Entries, Provider, Collections), **Database entries** (COUNTRY, SOURCE, STATUS, EFFECTIVE FROM, END DATE), **Activities**. |
| **Configuration** › **Rules** (`/rules`) | Rules list | Filters **Status**, **Templates**; button **Create rule**. Columns TITLE, PRIORITY, HIT RATE, LAST FIRED, STATUS. Rows show "Alert severity:", "Set status:", "Set label:" or "Configure actions". Statuses **Active**, **Disabled**, **Draft**. Rule detail: **Edit rule**, **Deactivate rule**; **Summary** (Rule condition, False Positive, True Positive, SAR Rate, Alert Volume "Last 12 months", Alert Resolution, Top Firing Corridors, Channels); **Associated entities** (ENTITY, FIRED, ALERT). Create page steps **Rule description**, **Template & country scope**, **Rule context**; fields Title, Description, Severity (Low/Medium/High/Critical), Priority, Trigger type **Event-driven** / **Scheduled**; buttons **Save as draft**, **Continue**. |

## Workflow and Help

- **Workflow** = **Settings** › **Configuration** › **Workflows** (see table above). There is no separate rail item named "Workflow"; the wrench icon is **Configuration**.
- **Help** = **Settings** › **Need help?** (`/help`). Empty page in this build.

## French (FR) labels

Switch: top bar **En** › **Français** (button then shows **Fr**). Switched back to **English** afterwards.

| EN | FR |
| --- | --- |
| Business Portal | Portail d'entreprise |
| Dashboard | Tableau de bord |
| works | works (untranslated) |
| Alerts | Alertes |
| Verifications | Vérifications |
| Screening | Dépistage |
| Cases | Cas (page buttons/KPIs use "Dossiers") |
| Data | Data (untranslated) |
| Entities | Entités |
| Transactions & Events | Transactions et événements |
| Report | Rapport |
| Settings (group) | Settings (untranslated) |
| General Settings | Paramètres généraux |
| Configuration | Configuration |
| Workflows | Workflows |
| Templates | Modèles |
| Watchlists | Listes de surveillance |
| Rules | Règles |
| Need help? | Besoin d'aide? |
| All Tenant Settings | Tous les paramètres du tenant |
| Events (page heading) / Quarantined | Événements / En quarantaine |
| Lists / Collections | Listes / Collections |
| Status / Severity | Statut / Gravité |
| Reload / Previous / Next | Recharger / Précédent / Suivant |
| New screening | Nouveau dépistage |
| Start new research / Sync alerts | Lancer une recherche / Synchroniser les alertes |
| Create report / Create rule / Create list / Create workflow | Créer un rapport / Créer une règle / Créer une liste / Créer un workflow |
| Save changes | Enregistrer les modifications |
| Individual / Company (Verifications tabs) | Individuel / Entreprise |

Untranslated strings seen in FR: **works**, **Data**, **Settings** (rail groups), **Country** filter, **High Risk Entities** panel, **Assign analyst**.
