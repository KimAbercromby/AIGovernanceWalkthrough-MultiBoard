# AI Governance Lifecycle Walkthrough

An organisation-neutral, interactive walkthrough of how one AI system can move
from discovery to monitoring and retirement while retaining a connected
governance history. It preserves four example routes (resident-facing service,
staff productivity assistant, retrospective discovery and action-capable
agent), twelve lifecycle stages, and the condition / return-for-evidence
illustrations.

**Live tool:** https://kimabercromby.github.io/AIGovernanceWalkthrough-MultiBoard/

## Use and deployment

This is a dependency-free static site. `index.html` loads the maintainable
browser modules in `src/` and `styles.css` directly; there is no generated
bundle, build step, server, API, or external runtime dependency. It can be
previewed locally by serving this directory over HTTP, or published directly
from the repository root with GitHub Pages (Settings → Pages → Deploy from a
branch → `main` → `/ (root)`). The application makes no external requests and
continues to work offline.

Run the domain-model checks from this directory with:

```sh
node --test
```

## What it demonstrates

- Four illustrative cases, selected independently of the shared twelve-stage
  lifecycle.
- A stable Council-issued AIR-ID as an identity boundary. The walkthrough does
  **not** invent or display a sample AIR-ID; the authorised Council process
  issues and confirms it.
- Case-specific changes in emphasis without deciding risk tier, legal scope,
  approval, or whether a control is applicable.
- Separate ownership in the proposed integrated 05/36 workbook:
  - 05 holds the permanent Council-issued AIR-ID and current system/assurance
    state, with an Evidence Index pointing to native evidence.
  - 36 in the **same workbook** separates the prospective Gate Plan, dated Gate
    Events, and event-linked Gate Conditions.
  - Formal decisions remain in WCC-AIG-16 or approved native forum minutes;
    event references do not replace them.
  - WCC-AIG-45 owns agent permissions and delegations.
- An illustrative condition and return-for-evidence interaction that explains
  the handoff but does not create, save, or record a gate outcome.
- A framework handoff comparing proposed requirement/source review destinations
  27 and 42 without treating a publication or map as a legal applicability or
  conformity decision.

## Governance and interpretation boundaries

The Westminster suite used as context is a **proposed draft for Council review,
not approved or live policy**. This tool is an educational demonstration, not a
system of record. Its stage navigation is not evidence of a completed stage or
gate. No submitted information is stored.

All risk tiers require screening. AGPI prioritises attention; it is not a risk
assessment and does not waive Equality Act 2010 section 149, Human Rights Act
1998 section 6, privacy or other case-specific duties. EU AI Act, ATRS,
procurement and standards requirements are conditional and need case-specific
confirmation by the appropriate legal or policy owner. The walkthrough does not
fabricate AIR-IDs, approvals, legal scope, FRIA completion, publication,
permissions or ISO conformity.

Illustrative outputs are drafts and handoffs only. They must not be copied into
live register rows without verification against the exact current 05/36 headers
and the authorised process. The tool does not connect to the workbook or write
Council records. Evidence stays in its native authoritative source.

The roles and forums shown are generic. Each organisation must map them to its
approved authorities, owners and local controls.

## Connected toolkit

- **This walkthrough:** how the connected history moves from intake to
  retirement, including retrospective and agentic routes.
- **[Triage Calculator and Router](https://kimabercromby.github.io/AIGovernanceTriage-MultiBoard/):**
  proposed priority, risk, agency and route handoffs.
- **[Triage Engines Simulation](https://kimabercromby.github.io/triage-engines-simulation/):**
  how prioritisation and routing engines reach their answers.