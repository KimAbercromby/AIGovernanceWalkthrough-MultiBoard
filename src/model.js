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
    system: {
      label: "Illustrative resident-facing service system",
      airId: null,
      status: "Unverified; system-level status does not establish any use-specific decision"
    },
    useCases: [
      {
        reference: "Illustrative use A",
        ucId: null,
        purpose: "Routine information support for a resident-facing service",
        priority: "Illustrative: standard attention; confirm with owners",
        risk: "Unassessed; screen impacts and duties",
        decision: "UNVERIFIED — verify the UC-specific decision and any conditions in authorised records"
      },
      {
        reference: "Illustrative use B",
        ucId: null,
        purpose: "Use that materially influences an individual service outcome",
        priority: "Illustrative: heightened attention",
        risk: "Unassessed; impact and rights review needed",
        decision: "UNVERIFIED — verify the UC-specific decision and any conditions in authorised records"
      }
    ],
    stageNotes: {
      0: "Capture intended service, affected people and supplier context. The intake is a draft handoff, not a Council-issued identifier.",
      4: "Determine risk and assurance needs with the responsible owners. A resident-facing context merits careful screening; this example does not predetermine a risk tier.",
      5: "Gate 4 (Procurement board) applies wherever a procurement, new contract, licence change or contract variation is needed. For an AI feature under an existing contract or licence, or a free public tool, record Gate 4 as “N/A — existing contract / free tool” with the reason, and still complete the supplier checks that apply: data processing terms and the AIG-ASS-08 sections on data protection and security (section 5) and business continuity and exit (section 8) (AIG-DEC-01 Gate 4 rule; Proposed — for Council confirmation). Gate 5 (ethics) applies from Medium. Mark any gate that does not apply as N/A in the Gate Plan with its reason (AIG-DEC-01).",
      7: "Consider procurement and supplier assurance if applicable. Confirm procurement requirements and legal scope with their owners. If the service uses generative AI and its governing tier is Medium, a documented adversarial test (AIG-ASS-11 Section 7) is required before go-live (Gate 6); at High and Critical the full AIG-ASS-11 security review applies (Proposed — for Council confirmation).",
      9: "A formal decision belongs in AIG-DEC-03 or approved native forum minutes, not in this walkthrough or an event log.",
      10: "Where the adversarial test applies (resident-facing generative AI at Medium), confirm its outcome is recorded in the AIG-OPS-01 pre-go-live checklist before the Gate 6 go-live decision (Proposed — for Council confirmation)."
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
    system: {
      label: "Illustrative staff productivity system",
      airId: null,
      status: "Unverified; system-level status does not establish any use-specific decision"
    },
    useCases: [
      {
        reference: "Illustrative use A",
        ucId: null,
        purpose: "Ordinary non-agentic internal drafting with no action permissions",
        priority: "Illustrative: lower attention",
        risk: "Illustrative: lower relative risk; still screen",
        decision: "UNVERIFIED — verify the UC-specific decision and any conditions in authorised records"
      },
      {
        reference: "Illustrative use B",
        ucId: null,
        purpose: "Summarising sensitive case material for a different operational purpose",
        priority: "Illustrative: heightened attention",
        risk: "Illustrative: different and potentially elevated impacts; assess",
        decision: "UNVERIFIED — verify the UC-specific decision and any conditions in authorised records"
      }
    ],
    stageNotes: {
      0: "An obviously low-risk use may take the one-page Fast-Track Screening (AIG-INV-02) instead of the full Intake and triage. All ten answers must be No, with no mandatory trigger, and the AI Governance Lead validates the route. The screen is a routing decision only: it does not replace intake facts, create an AIR-ID or authorise use, and equality, Convention-rights and DPIA screening still apply at Low. After validation, a proportionate delegated decision for the UC-ID is still recorded (AIG-DEC-03 or approved minutes) and a Gate Event is logged in AIG-DEC-04 before use.",
      3: "Verify the actual capabilities and permissions. Do not assume that a product marketed as an assistant cannot act. If it can act, or the answer is Unsure, Fast Track stops and the use goes through Agentic Triage (AIG-AGT-03).",
      4: "Even a low-priority or light-touch case is screened. AGPI prioritisation does not waive equality, human-rights, privacy or other duties.",
      5: "Record the reason for any gate not required in the proper planning record; do not infer “not applicable” from this example."
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
    system: {
      label: "Illustrative discovered system",
      airId: null,
      status: "Unverified; discovery does not establish any use-specific decision"
    },
    useCases: [
      {
        reference: "Illustrative use A",
        ucId: null,
        purpose: "Use confirmed during retrospective fact-finding",
        priority: "Illustrative: urgent fact-finding",
        risk: "Unassessed; establish facts and exposure",
        decision: "UNVERIFIED — verify the UC-specific decision and any conditions in authorised records"
      },
      {
        reference: "Illustrative use B",
        ucId: null,
        purpose: "A materially different discovered purpose, if found",
        priority: "Illustrative: assess separately",
        risk: "Unassessed; do not inherit another use's assessment",
        decision: "UNVERIFIED — verify the UC-specific decision and any conditions in authorised records"
      }
    ],
    stageNotes: {
      0: "Record the discovery and known facts through the approved intake route. Do not backdate an approval or invent an AIR-ID.",
      2: "Establish current use, ownership, data flows, controls and evidence. Escalate safety, rights, privacy or security concerns through their proper routes.",
      9: "If there is a real risk of harm, the Service Owner or AI System Owner pauses the use at once, without waiting for a decision (Playbook §4.7.17). The pause is containment, not a decision: it is recorded in AIG-OPS-03 Part A and logged in AIG-DEC-04 as a “Precautionary pause (containment)” event with Outcome “Paused — pending decision”, the incident reference and a follow-up decision due date. Continued suspension, resumption, change or withdrawal is decided by the officer or forum with confirmed delegation and recorded in AIG-DEC-03 or approved native minutes; the AI Assurance Board may call for a pause and recommends, but does not decide (Proposed — for Council confirmation)."
    }
  },
  {
    id: "agentic",
    number: "04",
    title: "Action-capable agent",
    short: "Can act · enhanced controls",
    type: "ENHANCED / AGENTIC ROUTE",
    description: "An agentic system may call tools, change records or otherwise act. Capability and permission are assessed explicitly; agent authority and delegations are owned by AIG-AGT-04, not inferred from a lifecycle stage.",
    emphasis: "No authority is granted here. Apply the can-it-act screen and verify permissions in the authorised source.",
    route: "Potentially action-capable · enhanced controls to assess",
    system: {
      label: "Illustrative action-capable system",
      airId: null,
      status: "Unverified; system identity and state require confirmation"
    },
    useCases: [
      {
        reference: "Illustrative use A",
        ucId: null,
        purpose: "Ordinary non-agentic use with actions disabled",
        priority: "Illustrative: assess proportionately",
        risk: "Unassessed; verify actual configuration",
        decision: "UNVERIFIED — verify the UC-specific decision and any conditions in authorised records"
      },
      {
        reference: "Illustrative use B",
        ucId: null,
        purpose: "Action-capable use with tool access or write permissions",
        priority: "Illustrative: heightened attention",
        risk: "Unassessed; assess action-specific impacts and controls",
        decision: "UNVERIFIED — verify the UC-specific decision and any conditions in authorised records"
      }
    ],
    stageNotes: {
      3: "Test whether the system can take actions in its real configuration, including tool access, delegated credentials, write permissions and human confirmation. “Unsure” is treated as Yes (action-capable) until confirmed.",
      5: "For every action-capable use (any agency tier, including T0) the Gate Plan includes Gate 2 (Technical design review, where the agentic control checkpoints are evidenced) and Gate 6 (go-live, which grants the permitted autonomy level), whatever the risk tier.",
      6: "Use the Agentic Triage (AIG-AGT-03) agency profile and tiering process. Do not use this illustration to assign an agency tier or grant permission. The agency tier sets a minimum pathway (T0 and T1 none; T2 Medium; T3 High; T4 High, or Critical without evidenced per-action human review; T5 Critical) and the governing tier is the higher of that and the risk-tier route. Actions without evidenced per-action human review engage the §4.4.6 Critical floor (“Unsure” counts as No). From T3 a formal AI Assurance Board recommendation precedes the decision (the Board advises; it does not decide); at T4 the AIG-ASS-11 security review is complete before the Gate 2 decision; T5 needs executive and safety escalation.",
      7: "AIG-AGT-04 owns agent authority, permissions and delegations. This walkthrough does not create or modify that record.",
      9: "At Gate 6 the go-live decision-maker grants the permitted autonomy level for each UC-ID and records it in AIG-DEC-03; it is then written to AIG-AGT-04 with its decision reference, and may be lower than the level requested.",
      10: "Before go-live, AIG-OPS-01 confirms the AIG-AGT-04 runtime controls are Implemented / Evidenced and the agentic control checkpoints are re-confirmed at Gate 6. No consequential action runs before the Gate 6 decision.",
      11: "Runtime action records (AIG-AGT-06) remain in their designated source, from go-live onwards. Monitoring (AIG-OPS-02) must cover actual actions, limits, failures and revocation."
    }
  }
];

export const stages = [
  {
    title: "Discover and intake",
    question: "What system or proposed use needs to be registered?",
    authority: "Service / business owner; intake route",
    evidence: ["Purpose and intended use", "Owner and supplier context", "People and services in scope"],
    output: "A draft AIG-INV-03 intake handoff and a request to follow the authorised identifier process.",
    handoff: "AIG-INV-03 intake → proposed controlled AIG-INV-05 relationship mapping → authorised AIG-INV-04 Register owner",
    record: "AIG-INV-03 — AI Intake Form / authorised intake route",
    note: "Intake and this walkthrough do not issue a permanent AIR-ID."
  },
  {
    title: "Map capabilities and system relationships",
    question: "Which outcome-led use cases need which capabilities, and what systems or components relate to them?",
    authority: "Service, technical and architecture owners",
    evidence: ["AIG-INV-03 use-case facts", "Verified AIG-INV-04 AIR-ID only when one exists", "Versioned model, data, interface, agent and tool pointers"],
    output: "An optional relationship-map handoff showing confirmed links, proposed links and gaps for owner review.",
    handoff: "Use proposed controlled AIG-INV-05 as a pointer; reconcile system identity to AIG-INV-04 and component authority to native sources",
    record: "AIG-INV-05 Capabilities and System Map — proposed controlled artefact, not approved/adopted; relationship pointers only",
    note: "The proposed map is not a second Register, legal/applicability source, permission record, gate, decision or approval. Unmapped or zero-count links do not prove absence."
  },
  {
    title: "Confirm identity and scope",
    question: "What is in scope, and is there already a system record?",
    authority: "Authorised Register owner",
    evidence: ["Verified system identity", "Related projects and components", "Known status and provenance"],
    output: "A proposed identity/scope handoff for reconciliation against the authorised current Register.",
    handoff: "Verify the official AIR-ID and current status against AIG-INV-04; reconcile map pointers separately",
    record: "AIG-INV-04 — proposed authorised Register: permanent AIR-ID and current system state",
    note: "Do not duplicate, infer or replace a Council-issued AIR-ID."
  },
  {
    title: "Screen capability",
    question: "What can the system actually do, and what controls constrain it?",
    authority: "Service, technical and security owners",
    evidence: ["Capabilities and permissions", "Human oversight", "Data, integrations and change history"],
    output: "A capability and action-screening handoff, including whether enhanced agentic controls need assessment.",
    handoff: "Route verified findings to the right assurance owners; an action-capable use (“can it act?” Yes or Unsure) goes to Agentic Triage (AIG-AGT-03)",
    record: "Proposed AIG-INV-05 map relationship pointers only; AIG-INV-04 current state; AIG-AGT-04 agent authority and permissions",
    note: "Marketing labels and a stage in this walkthrough do not establish capability. “Unsure” is treated as Yes until confirmed."
  },
  {
    title: "Prioritise and assess risk",
    question: "What assurance depth and case-specific screening are needed?",
    authority: "Relevant assurance leads and accountable service owner",
    evidence: ["AGPI priority rationale (urgency and sequencing)", "Risk and impact assessment, with the governing tier rationale (AIG-ASS-02 Step 6)", "Equality, rights, privacy and safety screening", "Assurance depth by governing tier: an independent assurance review at High (Playbook §4.5.3, §4.5.9); independent challenge and independent assurance at Critical (§3.10.2)"],
    output: "A proposed assessment plan; decisions and findings must be recorded in their proper sources.",
    handoff: "Screen every tier; route specialist questions to accountable owners",
    record: "AIG-INV-04 current assurance state; AIG-ASS-01 priority, AIG-ASS-02 risk assessment and native specialist sources",
    note: "AGPI priority sets how soon and in what order governance looks at the use; it is not risk classification, permission or a waiver of duties. The route (forum, assessments, gates and review cadence) follows the governing tier: the highest of the §4.4 risk tier, any §4.4.6 trigger floor, the impact floor (a confirmed Impact 5 sets at least Medium) and, for action-capable uses, the agency-tier minimum. Nothing lowers it."
  },
  {
    title: "Build the gate plan",
    question: "Which reviews are planned, by whom, and when?",
    authority: "Governance coordinator and accountable owners",
    evidence: ["Applicable proposed gates (AIG-DEC-01 Gate Map, set by the governing tier)", "Owners and target dates", "Non-applicable gates marked N/A, with the reason"],
    output: "A prospective Gate Plan—not proof that any gate occurred or passed.",
    handoff: "Verify the destination and exact headers before preparing a live handoff",
    record: "AIG-DEC-04 Gate Log — prospective plan under the confirmed AIR-ID",
    note: "The Gate Log and Register remain distinct sources linked by the confirmed AIR-ID. A proposed plan is not an event, decision or approval."
  },
  {
    title: "Assess agency and authority",
    question: "Can an agent act, and what limits or delegations are authorised?",
    authority: "AI Governance Lead (Agentic Triage, AIG-AGT-03) with service and technical owners; decisions stay with the officer or forum with confirmed delegation",
    evidence: ["Agency profile and proposed tier", "Tool and permission inventory", "Human controls and revocation route"],
    output: "An authority-review handoff; no authority or permission is conferred by this walkthrough.",
    handoff: "Agent permissions and delegations stay with their authorised owner",
    record: "AIG-AGT-03 Agentic Triage result; AIG-AGT-04 — Agent Record (ASBOM) and authority source",
    note: "Applies to every action-capable use (any agency tier, including T0). Agentic triage is a routing and evidence mechanism, not an approval layer; the agency tier sets a minimum pathway and never lowers the risk-tier route. Never infer permission from an approval elsewhere."
  },
  {
    title: "Complete specialist reviews",
    question: "Which technical, rights, privacy, commercial or legal reviews apply?",
    authority: "The relevant specialist and legal/policy owners",
    evidence: ["Native specialist reviews", "Source and supplier assurance", "Applicable obligations confirmed for this case"],
    output: "Versioned evidence pointers and open questions for the appropriate owners.",
    handoff: "AIG-INV-04 Evidence Index points to native evidence; evidence remains authoritative at source",
    record: "AIG-INV-04 Evidence Index; AIG-AIMS-05 AIMS Applicable Requirements and Change Register and AIG-AIMS-13 AI Source Assurance and Traceability Register where relevant",
    note: "EU AI Act, ATRS, procurement and standards questions require case-specific confirmation. At High, an independent assurance review applies (Playbook §4.5.3, §4.5.9); at Critical, independent challenge and independent assurance (§3.10.2) (Proposed — for Council confirmation)."
  },
  {
    title: "Hold dated gate events",
    question: "What review actually happened, when, and with what outcome?",
    authority: "The relevant forum, within its approved authority",
    evidence: ["Meeting/event date", "Participants and evidence considered", "Decision reference and outcome"],
    output: "A dated event handoff linked to the appropriate formal decision record.",
    handoff: "A plan is prospective; an event is dated history",
    record: "AIG-DEC-04 Gate Log — dated events linked by the same AIR-ID",
    note: "A logged event does not itself supply the decision, authority or approval."
  },
  {
    title: "Record decision and conditions",
    question: "What did the authorised decision-maker decide, and on what basis?",
    authority: "The officer or forum with confirmed delegation (the AI Assurance Board advises and recommends; it does not decide)",
    evidence: ["Authority and date", "Rationale and evidence", "Conditions, owners and due dates"],
    output: "A formal decision in AIG-DEC-03 or approved native forum minutes; linked event references only.",
    handoff: "Event-linked conditions stay traceable to their originating decision",
    record: "AIG-DEC-03 — formal decision; AIG-DEC-04 Gate Log — conditions linked to its event and AIR-ID",
    note: "This walkthrough cannot record, infer, or present an approval as granted."
  },
  {
    title: "Prepare release handoff",
    question: "Are outstanding conditions and operational controls resolved or explicitly managed?",
    authority: "Release owner under the organisation's approved authority",
    evidence: ["Decision and conditions", "Operational readiness", "Approved limitations and escalation routes"],
    output: "A draft release-readiness handoff for authorised review—not a deployment decision.",
    handoff: "Reconcile live handoff against exact approved workbook headers",
    record: "AIG-OPS-01 — AI Deployment and Rollout Plan (readiness, conditions carried into go-live, rollback and fallback; section 8 business continuity link, Proposed — for Council confirmation: is this service a prioritised activity in the Council's business continuity plan? Yes / No / Not known, with the plan reference if yes); AIG-DEC-04 plan/events and AIG-DEC-03 decision source; AIG-AGT-04 if agent authority applies",
    note: "The walkthrough does not mark conditions satisfied or authorise deployment. Use of a UC-ID begins only after its delegated go-live decision (Gate 6) is recorded in AIG-DEC-03 with the dated event in AIG-DEC-04; the AIG-INV-04 system baseline is then reconciled to Approved / Active, which is not itself use permission (AIG-OPS-01)."
  },
  {
    title: "Monitor and respond",
    question: "How will outcomes, incidents, changes and any agent actions be observed?",
    authority: "Service Owner or AI System Owner (who pauses at once, without waiting for a decision, if there is a real risk of harm, Playbook §4.7.17) and monitoring / incident responders",
    evidence: ["Monitoring measures and review dates", "Incident reporting, severity and escalation", "Contestability and redress route", "Action records and change signals"],
    output: "A monitoring handoff to the designated operational sources.",
    handoff: "Monitoring and runtime records stay in their native sources",
    record: "AIG-OPS-02 monitoring source; AIG-OPS-03 incident reports; AIG-OPS-04 challenges and redress; AIG-AGT-04 for agent authority context",
    note: "This walkthrough is not an incident, monitoring or runtime action log. A precautionary pause is containment, logged in AIG-DEC-04 as a “Precautionary pause (containment)” event; continued suspension, resumption or withdrawal is decided by the officer or forum with confirmed delegation."
  },
  {
    title: "Re-enter, retire and close",
    question: "Has a material change, retirement or other event changed the governance route?",
    authority: "Accountable owner and relevant authorised forum",
    evidence: ["Change and re-entry rationale", "Retirement evidence for each UC-ID (the AIR-ID retires only when every use is closed)", "Record closure and retention checks"],
    output: "A change or retirement handoff that preserves the system's connected history.",
    handoff: "Update only through the authorised register and event processes",
    record: "AIG-INV-04 current state; AIG-DEC-04 event history; native monitoring / retirement sources",
    note: "Material change may reopen relevant reviews; retirement does not erase the audit history."
  }
];

export const recordBoundaries = [
  {
    number: "AIG-INV-05",
    label: "RELATIONSHIP POINTERS",
    title: "Proposed controlled system map",
    text: "AIG-INV-05 is a proposed controlled artefact, not yet approved or adopted. It is a relationship-pointer aid linking outcome-led use cases, capabilities, governed systems and referenced components. It is not a second Register or an authoritative legal, permission, gate, decision or approval source; AIG-INV-03 remains the use-case source and official system identity/current state remains in AIG-INV-04.",
    color: "teal"
  },
  {
    number: "AIG-INV-04",
    label: "SYSTEM & ASSURANCE",
    title: "Permanent identity, current state",
    text: "AIG-INV-04 is the proposed Register artefact for the Council-issued AIR-ID and current system/assurance state. The Evidence Index keeps versioned pointers to native evidence; neither a proposed map nor this walkthrough replaces it.",
    color: "navy"
  },
  {
    number: "AIG-DEC-04",
    label: "GOVERNANCE HISTORY",
    title: "Plan ≠ event ≠ condition",
    text: "The proposed AIG-DEC-04 Gate Log carries the same confirmed AIR-ID into a prospective Gate Plan, dated Gate Events and individually event-linked Gate Conditions. It remains a distinct source from the AIG-INV-04 Register and formal decisions.",
    color: "blue"
  },
  {
    number: "AIG-DEC-03",
    label: "FORMAL DECISION",
    title: "Authority and rationale",
    text: "Formal decisions stay in AIG-DEC-03 or approved native forum minutes. A gate event points to that decision; a derived view or count is not approval evidence.",
    color: "gold"
  },
  {
    number: "AIG-AGT-04",
    label: "AGENT AUTHORITY",
    title: "Permissions live at source",
    text: "AIG-AGT-04 owns agent permissions and delegations. Other records join via AIR-ID and a proposed stable AG-ID; this demonstration invents neither identifier nor permission.",
    color: "violet"
  }
];

// These are references between distinct records, not a shared or transferred dataset.
// The AIR-ID remains the identity in AIG-INV-04; it is intentionally not populated here.
export const recordThread = [
  {
    id: "identity",
    number: "AIG-INV-04",
    title: "Register",
    description: "Council-issued AIR-ID + current status",
    role: "Identity owner"
  },
  {
    id: "intake",
    number: "AIG-INV-03",
    title: "Intake",
    description: "Use-case and intake facts",
    role: "Intake source"
  },
  {
    id: "map",
    number: "AIG-INV-05",
    title: "System map",
    description: "Descriptive artefact · proposed catalogue, not adopted",
    role: "Relationship pointers only"
  },
  {
    id: "history",
    number: "AIG-DEC-04",
    title: "Gate Log",
    description: "Plans · dated events · event-linked conditions",
    role: "Separate lifecycle history"
  },
  {
    id: "decision",
    number: "AIG-DEC-03",
    title: "Decision",
    description: "Formal decision; or approved native minutes",
    role: "Formal authority"
  }
];

// Thread emphasis follows the lifecycle; the identity owner remains visible at every stage.
export const stageThreadFocus = [
  ["intake"],
  ["map"],
  ["identity"],
  ["map", "identity"],
  ["identity"],
  ["history"],
  ["identity"],
  ["identity"],
  ["history"],
  ["decision", "history"],
  ["decision", "history"],
  ["history"],
  ["identity", "history"]
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

// An identifier is verified only when it is present and every authoritative
// reference supplied for comparison agrees. Missing or conflicting values are
// deliberately treated as unverified, never inferred from a system baseline.
export function identifierStatus(values) {
  const supplied = values.filter((value) => typeof value === "string" && value.trim());
  if (supplied.length !== values.length || supplied.length === 0) return "unverified";
  return new Set(supplied).size === 1 ? "verified" : "unverified";
}

export function createIllustrativeOutcome(kind, stageIndex) {
  if (!Number.isInteger(stageIndex) || stageIndex < 0 || stageIndex >= stages.length) {
    throw new RangeError("Choose a valid lifecycle stage.");
  }
  if (kind === "condition") {
    return {
      title: "Illustrative condition only",
      text: "Example: evidence is requested before the next review. In a real process, an authorised decision-maker must set the condition; its owner, due date and source event must be recorded in the proposed AIG-DEC-04 workflow after approval/adoption. Nothing was saved."
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