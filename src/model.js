export const cases = [
  {
    id: "resident-service",
    number: "01",
    title: "Resident-facing service",
    short: "Procured · resident-facing",
    type: "STANDARD / ENHANCED ROUTE",
    description: "A service procured to support a resident-facing process. The route depends on intended use, impacts, data, supplier controls and the system's actual capabilities—not the procurement label alone.",
    emphasis: "Screen impacts and applicable duties; assess the case before confirming gates or obligations.",
    route: "Resident-facing · procurement context · duties to confirm",
    stageNotes: {
      1: "Capture intended service, affected people and supplier context. The intake is a draft handoff, not a Council-issued identifier.",
      3: "Determine risk and assurance needs with the responsible owners. A resident-facing context merits careful screening; this example does not predetermine a risk tier.",
      6: "Consider procurement and supplier assurance if applicable. Confirm procurement requirements and legal scope with their owners.",
      8: "A formal decision belongs in WCC-AIG-16 or approved native forum minutes, not in this walkthrough or an event log."
    }
  },
  {
    id: "staff-assistant",
    number: "02",
    title: "Staff productivity assistant",
    short: "Routine use · no actions assumed",
    type: "LIGHT-TOUCH EXAMPLE",
    description: "A staff productivity assistant is shown on a proportionate light-touch path where it cannot take actions. “Routine” does not mean unscreened: data, purpose, impacts and all relevant duties still need consideration.",
    emphasis: "Light-touch is an example route, not an exemption from screening or case-specific duties.",
    route: "Staff use · capability and data must be checked",
    stageNotes: {
      2: "Verify the actual capabilities and permissions. Do not assume that a product marketed as an assistant cannot act.",
      3: "Even a low-priority or light-touch case is screened. AGPI prioritisation does not waive equality, human-rights, privacy or other duties.",
      7: "Record the reason for any gate not required in the proper planning record; do not infer “not applicable” from this example."
    }
  },
  {
    id: "retrospective",
    number: "03",
    title: "System found already live",
    short: "Already live · retrospective",
    type: "RETROSPECTIVE ROUTE",
    description: "An AI-enabled system is discovered after it has gone live. The organisation establishes the facts, records current state, assesses exposure and routes the case for authorised decisions without rewriting history.",
    emphasis: "Discovery is not approval. Record verified facts, escalate concerns and obtain authorised direction.",
    route: "In use · retrospective discovery · immediate fact-finding",
    stageNotes: {
      0: "Record the discovery and known facts through the approved intake route. Do not backdate an approval or invent an AIR-ID.",
      4: "Establish current use, ownership, data flows, controls and evidence. Escalate safety, rights, privacy or security concerns through their proper routes.",
      8: "A decision to continue, change or pause use must come from an authorised forum and be recorded in WCC-AIG-16 or approved native minutes."
    }
  },
  {
    id: "agentic",
    number: "04",
    title: "Action-capable agent",
    short: "Can act · enhanced controls",
    type: "AGENTIC ROUTE",
    description: "An agentic system may call tools, change records or otherwise act. Capability and permission are assessed explicitly; agent authority and delegations are owned by 45, not inferred from a lifecycle stage.",
    emphasis: "No authority is granted here. Apply the can-it-act screen and verify permissions in the authorised source.",
    route: "Potentially action-capable · enhanced controls to assess",
    stageNotes: {
      2: "Test whether the system can take actions in its real configuration, including tool access, delegated credentials, write permissions and human confirmation.",
      5: "Use the approved agency profile and tiering process. Do not use this illustration to assign an agency tier or grant permission.",
      6: "WCC-AIG-45 owns agent authority, permissions and delegations. This walkthrough does not create or modify that record.",
      9: "Runtime Action / Decision Records remain in their designated source. Monitoring must cover actual actions, limits, failures and revocation."
    }
  }
];

export const stages = [
  {
    title: "Discover and intake",
    question: "What system or proposed use needs to be registered?",
    authority: "Service / business owner; intake route",
    evidence: ["Purpose and intended use", "Owner and supplier context", "People and services in scope"],
    output: "A draft intake and a request to follow the authorised identifier process.",
    handoff: "Intake → authorised register owner",
    record: "05 — current system record once verified",
    note: "A permanent AIR-ID is issued by the Council process; this tool never creates one."
  },
  {
    title: "Confirm identity and scope",
    question: "What is in scope, and is there already a system record?",
    authority: "Authorised Register owner",
    evidence: ["Verified system identity", "Related projects and components", "Known status and provenance"],
    output: "A proposed identity/scope handoff for reconciliation against the current register.",
    handoff: "Verify against 05 before any row is changed",
    record: "05 — permanent AIR-ID and current state",
    note: "Do not duplicate, infer or replace a Council-issued AIR-ID."
  },
  {
    title: "Screen capability",
    question: "What can the system actually do, and what controls constrain it?",
    authority: "Service, technical and security owners",
    evidence: ["Capabilities and permissions", "Human oversight", "Data, integrations and change history"],
    output: "A capability and action-screening handoff, including whether enhanced agentic controls need assessment.",
    handoff: "Route verified findings to the right assurance owners",
    record: "05 current state; 45 for agent authority and permissions",
    note: "Marketing labels and a stage in this walkthrough do not establish capability."
  },
  {
    title: "Prioritise and assess risk",
    question: "What assurance depth and case-specific screening are needed?",
    authority: "Relevant assurance leads and accountable service owner",
    evidence: ["AGPI priority rationale", "Risk and impact assessment", "Equality, rights, privacy and safety screening"],
    output: "A proposed assessment plan; decisions and findings must be recorded in their proper sources.",
    handoff: "Screen every tier; route specialist questions to accountable owners",
    record: "05 current assurance state; native assessment sources",
    note: "AGPI orders attention; it is not risk classification, permission or a waiver of duties."
  },
  {
    title: "Build the gate plan",
    question: "Which reviews are planned, by whom, and when?",
    authority: "Governance coordinator and accountable owners",
    evidence: ["Applicable proposed gates", "Owners and target dates", "Reason for any gate not planned"],
    output: "A prospective Gate Plan—not proof that any gate occurred or passed.",
    handoff: "Verify the destination and exact headers before preparing a live handoff",
    record: "36 — prospective Gate Plan, within the integrated 05/36 workbook",
    note: "The workbook is one integrated working draft, not separate authoritative 05 and 36 files."
  },
  {
    title: "Assess agency and authority",
    question: "Can an agent act, and what limits or delegations are authorised?",
    authority: "Authorised agent-governance and service owners",
    evidence: ["Agency profile and proposed tier", "Tool and permission inventory", "Human controls and revocation route"],
    output: "An authority-review handoff; no authority or permission is conferred by this walkthrough.",
    handoff: "Agent permissions and delegations stay with their authorised owner",
    record: "45 — Agent Record / ASBOM and authority source",
    note: "Only relevant where agentic controls apply; never infer permission from an approval elsewhere."
  },
  {
    title: "Complete specialist reviews",
    question: "Which technical, rights, privacy, commercial or legal reviews apply?",
    authority: "The relevant specialist and legal/policy owners",
    evidence: ["Native specialist reviews", "Source and supplier assurance", "Applicable obligations confirmed for this case"],
    output: "Versioned evidence pointers and open questions for the appropriate owners.",
    handoff: "05 Evidence Index points to native evidence; evidence remains authoritative at source",
    record: "05 Evidence Index; 27/42 review references where relevant",
    note: "EU AI Act, ATRS, procurement and standards questions require case-specific confirmation."
  },
  {
    title: "Hold dated gate events",
    question: "What review actually happened, when, and with what outcome?",
    authority: "The relevant forum, within its approved authority",
    evidence: ["Meeting/event date", "Participants and evidence considered", "Decision reference and outcome"],
    output: "A dated event handoff linked to the appropriate formal decision record.",
    handoff: "A plan is prospective; an event is dated history",
    record: "36 — dated Gate Events",
    note: "A logged event does not itself supply the decision, authority or approval."
  },
  {
    title: "Record decision and conditions",
    question: "What did the authorised decision-maker decide, and on what basis?",
    authority: "Approved forum / delegated decision-maker",
    evidence: ["Authority and date", "Rationale and evidence", "Conditions, owners and due dates"],
    output: "A formal decision in WCC-AIG-16 or approved native forum minutes; linked event references only.",
    handoff: "Event-linked conditions stay traceable to their originating decision",
    record: "16 — formal decision; 36 — event-linked conditions",
    note: "This walkthrough cannot record, infer, or present an approval as granted."
  },
  {
    title: "Prepare release handoff",
    question: "Are outstanding conditions and operational controls resolved or explicitly managed?",
    authority: "Release owner under the organisation's approved authority",
    evidence: ["Decision and conditions", "Operational readiness", "Approved limitations and escalation routes"],
    output: "A draft release-readiness handoff for authorised review—not a deployment decision.",
    handoff: "Reconcile live handoff against exact approved workbook headers",
    record: "36 plan/events and 16 decision source; 45 if agent authority applies",
    note: "The walkthrough does not mark conditions satisfied or authorise deployment."
  },
  {
    title: "Monitor and respond",
    question: "How will outcomes, incidents, changes and any agent actions be observed?",
    authority: "Service owner and monitoring / incident responders",
    evidence: ["Monitoring measures and review dates", "Incident and contestability routes", "Action records and change signals"],
    output: "A monitoring handoff to the designated operational sources.",
    handoff: "Monitoring and runtime records stay in their native sources",
    record: "Monitoring source; 45 for agent authority context",
    note: "This walkthrough is not an incident, monitoring or runtime action log."
  },
  {
    title: "Re-enter, retire and close",
    question: "Has a material change, retirement or other event changed the governance route?",
    authority: "Accountable owner and relevant authorised forum",
    evidence: ["Change and re-entry rationale", "Retirement / decommissioning evidence", "Record closure and retention checks"],
    output: "A change or retirement handoff that preserves the system's connected history.",
    handoff: "Update only through the authorised register and event processes",
    record: "05 current state; 36 event history; native monitoring / retirement sources",
    note: "Material change may reopen relevant reviews; retirement does not erase the audit history."
  }
];

export const recordBoundaries = [
  {
    number: "05",
    label: "SYSTEM & ASSURANCE",
    title: "Permanent identity, current state",
    text: "The integrated workbook's 05 area holds the Council-issued AIR-ID and current system/assurance state. The Evidence Index keeps versioned pointers to native evidence; it does not replace the evidence.",
    color: "navy"
  },
  {
    number: "36",
    label: "GOVERNANCE HISTORY",
    title: "Plan ≠ event ≠ condition",
    text: "In the same 05/36 workbook, Gate Plan is prospective, Gate Events are dated history, and Gate Conditions are individually linked to an event. These are connected but distinct records.",
    color: "blue"
  },
  {
    number: "16",
    label: "FORMAL DECISION",
    title: "Authority and rationale",
    text: "Formal decisions stay in WCC-AIG-16 or approved native forum minutes. A gate event points to that decision; a derived view or count is not approval evidence.",
    color: "gold"
  },
  {
    number: "45",
    label: "AGENT AUTHORITY",
    title: "Permissions live at source",
    text: "WCC-AIG-45 owns agent permissions and delegations. Other records join via AIR-ID and a proposed stable AG-ID; this demonstration invents neither identifier nor permission.",
    color: "violet"
  }
];

export function getStageView(caseId, stageIndex) {
  const selectedCase = cases.find((item) => item.id === caseId);
  const stage = stages[stageIndex];
  if (!selectedCase || !stage) throw new RangeError("Unknown case or lifecycle stage.");
  return {
    ...stage,
    caseNote: selectedCase.stageNotes?.[stageIndex] ?? null,
    case: selectedCase
  };
}

export function createIllustrativeOutcome(kind, stageIndex) {
  if (!Number.isInteger(stageIndex) || stageIndex < 0 || stageIndex >= stages.length) {
    throw new RangeError("Choose a valid lifecycle stage.");
  }
  if (kind === "condition") {
    return {
      title: "Illustrative condition only",
      text: "Example: evidence is requested before the next review. In a real process, an authorised decision-maker must set the condition; its owner, due date and source event must be recorded in the approved 36 workflow. Nothing was saved."
    };
  }
  if (kind === "evidence") {
    return {
      title: "Illustrative return for evidence",
      text: "Example: return the item for a named evidence gap, preserve the event history, and reschedule through the authorised process. This is not a real gate outcome and nothing was saved."
    };
  }
  throw new TypeError("Unknown illustrative outcome.");
}