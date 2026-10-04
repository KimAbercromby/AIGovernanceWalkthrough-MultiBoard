import test from "node:test";
import assert from "node:assert/strict";
import { cases, createIllustrativeOutcome, getStageView, identifierStatus, recordBoundaries, recordThread, stageThreadFocus, stages } from "../src/model.js";

test("walkthrough retains four cases and a thirteen-stage connected lifecycle", () => {
  assert.equal(cases.length, 4);
  assert.equal(stages.length, 13);
  assert.equal(new Set(cases.map(({ id }) => id)).size, cases.length);
  assert.equal(stages[0].title, "Discover and intake");
  assert.match(stages[0].record, /AIG-INV-03.*AI Intake Form/i);
  assert.equal(stages[1].title, "Map capabilities and system relationships");
  assert.match(stages[1].record, /AIG-INV-05.*proposed controlled artefact.*not approved\/adopted/i);
  assert.equal(stages[2].title, "Confirm identity and scope");
  assert.match(stages[2].record, /AIG-INV-04.*Register/i);
  assert.equal(stages.at(-1).title, "Re-enter, retire and close");
});

test("case-specific notes tailor the route without deciding risk or applicability", () => {
  assert.match(getStageView("staff-assistant", 4).caseNote, /is screened/i);
  assert.match(getStageView("staff-assistant", 0).caseNote, /Fast-Track Screening \(AIG-INV-02\).*decision for the UC-ID is still recorded \(AIG-DEC-03.*Gate Event is logged in AIG-DEC-04 before use/i);
  assert.match(getStageView("staff-assistant", 0).caseNote, /routing decision only/i);
  assert.doesNotMatch(getStageView("staff-assistant", 0).caseNote, /recorded as the equality/i);
  assert.match(getStageView("staff-assistant", 5).caseNote, /proper planning record/i);
  assert.equal(getStageView("staff-assistant", 8).caseNote, null);
  assert.match(getStageView("agentic", 6).caseNote, /does not.*assign.*tier|Do not use this illustration to assign/i);
  assert.match(getStageView("resident-service", 7).caseNote, /Confirm.*requirements/i);
  assert.match(getStageView("retrospective", 0).caseNote, /Do not backdate/i);
  assert.throws(() => getStageView("unknown", 0), RangeError);
});

test("one unverified system identity maps to distinct, independently considered use cases", () => {
  for (const example of cases) {
    assert.equal(example.system.airId, null);
    assert.ok(example.useCases.length > 0);
    assert.ok(example.useCases.every((useCase) => useCase.ucId === null));
    assert.ok(example.useCases.every((useCase) => useCase.priority && useCase.risk && useCase.decision));
    assert.ok(example.useCases.every(({ decision }) => /^UNVERIFIED\b/.test(decision)));
    assert.ok(example.useCases.every(({ decision }) => /UC-specific decision and any conditions/i.test(decision)));
  }

  const staff = cases.find(({ id }) => id === "staff-assistant");
  assert.equal(staff.useCases.length, 2);
  assert.match(staff.system.status, /unverified/i);
  assert.match(staff.useCases[0].purpose, /ordinary non-agentic/i);
  assert.ok(staff.useCases.every(({ decision }) => /^UNVERIFIED\b/.test(decision)));
  assert.ok(staff.useCases.every(({ decision }) => /UC-specific decision and any conditions/i.test(decision)));
  assert.notEqual(staff.useCases[0].priority, staff.useCases[1].priority);
  assert.notEqual(staff.useCases[0].risk, staff.useCases[1].risk);
});

test("missing or conflicting identifiers remain unverified", () => {
  assert.equal(identifierStatus([null]), "unverified");
  assert.equal(identifierStatus([]), "unverified");
  assert.equal(identifierStatus(["record-a", "record-b"]), "unverified");
  assert.equal(identifierStatus(["record-a", null]), "unverified");
  assert.equal(identifierStatus(["record-a", "record-a"]), "verified");
});

test("record ownership keeps Register, Gate Log, decision and Agent Record distinct", () => {
  assert.match(stages[5].record, /AIG-DEC-04 Gate Log.*confirmed AIR-ID/i);
  assert.match(stages[5].note, /distinct sources linked by the confirmed AIR-ID/i);
  assert.match(stages[8].record, /AIG-DEC-04 Gate Log.*same AIR-ID/i);
  assert.match(stages[9].record, /AIG-DEC-03.*formal decision.*AIG-DEC-04 Gate Log.*event and AIR-ID/i);
  assert.match(stages[1].note, /not a second Register.*approval/i);
  assert.match(recordBoundaries.find(({ number }) => number === "AIG-DEC-04").text, /AIG-DEC-04 Gate Log carries the same confirmed AIR-ID/i);
  assert.match(recordBoundaries.find(({ number }) => number === "AIG-AGT-04").text, /owns agent permissions and delegations/i);
  assert.match(recordBoundaries.find(({ number }) => number === "AIG-INV-04").text, /Council-issued AIR-ID/i);
  assert.match(recordBoundaries.find(({ number }) => number === "AIG-INV-05").text, /relationship.pointer/i);
});

test("stage-aware thread retains one identity across distinct authoritative records", () => {
  const threadIds = new Set(recordThread.map(({ id }) => id));
  assert.equal(stageThreadFocus.length, stages.length);
  assert.deepEqual(recordThread[0], {
    id: "identity",
    number: "AIG-INV-04",
    title: "Register",
    description: "Council-issued AIR-ID + current status",
    role: "Identity owner"
  });
  assert.ok(recordThread.some(({ number, description }) => number === "AIG-INV-05" && /proposed catalogue, not adopted/i.test(description)));
  assert.ok(recordThread.some(({ number, description }) => number === "AIG-DEC-04" && /plans.*dated events.*conditions/i.test(description)));
  assert.ok(recordThread.some(({ number, description }) => number === "AIG-DEC-03" && /formal decision.*approved native minutes/i.test(description)));
  assert.ok(stageThreadFocus.every((focus) => focus.every((id) => threadIds.has(id))));
  assert.ok(stageThreadFocus[0].includes("intake"));
  assert.ok(stageThreadFocus[9].includes("decision"));
  assert.doesNotMatch(JSON.stringify(recordThread), /\bAIR-\d{4}-\d+\b/);
});

test("illustrative responses are explicit handoffs and never approval or saved rows", () => {
  const condition = createIllustrativeOutcome("condition", 7);
  const evidence = createIllustrativeOutcome("evidence", 9);
  assert.match(condition.text, /authorised decision-maker/i);
  assert.match(condition.text, /Nothing was saved/i);
  assert.match(evidence.text, /not a real gate outcome/i);
  assert.match(evidence.text, /nothing was saved/i);
  assert.throws(() => createIllustrativeOutcome("approval", 5), TypeError);
  assert.throws(() => createIllustrativeOutcome("condition", 13), RangeError);
});

test("legal and framework notes preserve the conditional boundaries", () => {
  const allText = [
    ...stages.flatMap((stage) => [stage.note, stage.output, stage.record]),
    ...cases.map((item) => `${item.description} ${item.emphasis}`),
    ...recordBoundaries.map((record) => `${record.title} ${record.text}`)
  ].join(" ");
  assert.match(allText, /AGPI/i);
  assert.match(allText, /waiver of duties/i);
  assert.match(allText, /case-specific/i);
  assert.match(allText, /AIG-INV-05.*not approved\/adopted/i);
  assert.doesNotMatch(allText, /\bAIR-\d{4}-\d+\b/);
});
// Suite v3.9.9 (Proposed — for Council confirmation). Sources: AIG-GOV-02 Playbook v19.9.18
// (Glossary "Governing tier", "Action-capable use"; §4.4.4 impact floor; §4.7.17),
// AIG-DEC-01 Gate Map v1.13 (Gate 2, Gate 4 rule, Gate 5, Gate 6, Gate 7 rows; Agentic pathway table and R1-R4),
// AIG-ASS-11 v1.10 (scope; Section 7), AIG-INV-02 v1.9 (Part B/C), AIG-OPS-01 v1.12 (section 8), AIG-DEC-04 v1.3
// (Precautionary pause event, Resume), AIG-GOV-06 v1.10 / AIG-ASS-03 v1.11 (independent assurance), AIG-GOV-03 v1.34 titles; AIG-AGT-04 v0.6 record levels (Playbook F.3).
test("v3.8: priority sets urgency only; the governing tier sets the route, including the impact floor", () => {
  const stage = stages[4];
  assert.match(stage.note, /priority sets how soon/i);
  assert.match(stage.note, /route \(forum, assessments, gates and review cadence\) follows the governing tier/i);
  assert.match(stage.note, /§4\.4 risk tier.*§4\.4\.6 trigger floor.*Impact 5 sets at least Medium.*agency-tier minimum/i);
  const allText = JSON.stringify({ cases, stages, recordBoundaries });
  assert.doesNotMatch(allText, /higher of (the )?priority/i);
  assert.doesNotMatch(allText, /priority route/i);
});

test("v3.7: every action-capable use (any tier, incl. T0) has Gate 2 and Gate 6; Unsure = Yes", () => {
  assert.match(stages[3].note, /Unsure.*treated as Yes/i);
  assert.match(stages[3].handoff, /Agentic Triage \(AIG-AGT-03\)/);
  assert.match(stages[6].note, /every action-capable use \(any agency tier, including T0\)/i);
  assert.match(stages[6].note, /not an approval layer/i);
  assert.match(stages[6].authority, /officer or forum with confirmed delegation/i);
  assert.match(getStageView("agentic", 3).caseNote, /Unsure.*treated as Yes/i);
  assert.match(getStageView("agentic", 5).caseNote, /including T0.*Gate 2.*Gate 6.*permitted autonomy/i);
  assert.match(getStageView("agentic", 9).caseNote, /Gate 6.*permitted autonomy level.*AIG-DEC-03.*AIG-AGT-04/i);
  assert.match(getStageView("staff-assistant", 3).caseNote, /Unsure.*Agentic Triage \(AIG-AGT-03\)/i);
});

test("v3.7: agency-tier minimum pathways, per-action review floor and Board role match AIG-DEC-01", () => {
  const note = getStageView("agentic", 6).caseNote;
  assert.match(note, /T0 and T1 none; T2 Medium; T3 High; T4 High, or Critical without evidenced per-action human review; T5 Critical/);
  assert.match(note, /higher of that and the risk-tier route/i);
  assert.match(note, /§4\.4\.6 Critical floor \(“Unsure” counts as No\)/);
  assert.match(note, /From T3 a formal AI Assurance Board recommendation.*does not decide/i);
  assert.match(note, /T4 the AIG-ASS-11 security review is complete before the Gate 2 decision/i);
  assert.match(note, /T5 needs executive and safety escalation/i);
  assert.equal(cases.find(({ id }) => id === "agentic").type, "ENHANCED / AGENTIC ROUTE");
});

test("agentic runtime records appear only from go-live, after the Gate 6 decision", () => {
  assert.match(getStageView("agentic", 10).caseNote, /No consequential action runs before the Gate 6 decision/i);
  assert.match(getStageView("agentic", 11).caseNote, /AIG-AGT-06.*from go-live/i);
  for (let index = 0; index < 9; index += 1) {
    assert.doesNotMatch(getStageView("agentic", index).caseNote ?? "", /AIG-AGT-06/);
  }
});

test("v3.9: resident-facing generative AI at Medium needs an adversarial test before Gate 6", () => {
  const specialist = getStageView("resident-service", 7).caseNote;
  assert.match(specialist, /generative AI.*Medium.*adversarial test \(AIG-ASS-11 Section 7\).*before go-live \(Gate 6\)/i);
  assert.match(specialist, /Proposed — for Council confirmation/);
  assert.match(getStageView("resident-service", 10).caseNote, /adversarial test.*AIG-OPS-01.*Gate 6/i);
  assert.match(getStageView("resident-service", 5).caseNote, /Gate 4.*Gate 5 \(ethics\) applies from Medium.*N\/A/i);
});

test("v3.9.2: Gate 4 follows the AIG-DEC-01 v1.8 procurement rule (N/A for an existing contract or free tool)", () => {
  const note = getStageView("resident-service", 5).caseNote;
  assert.match(note, /Gate 4 \(Procurement board\) applies wherever a procurement, new contract, licence change or contract variation is needed/);
  assert.match(note, /existing contract or licence, or a free public tool, record Gate 4 as “N\/A — existing contract \/ free tool” with the reason/);
  assert.match(note, /data processing terms and the AIG-ASS-08 sections on data protection and security \(section 5\) and business continuity and exit \(section 8\)/);
  assert.doesNotMatch(note, /If the system is procured, the Gate Plan includes Gate 4/);
});

test("v3.9.2: independent assurance review at High, independent challenge at Critical (W-11)", () => {
  const specialist = stages.find((s) => s.title === "Complete specialist reviews");
  assert.match(specialist.note, /At High, an independent assurance review applies \(Playbook §4\.5\.3, §4\.5\.9\); at Critical, independent challenge and independent assurance \(§3\.10\.2\)/);
  const risk = stages.find((s) => s.title === "Prioritise and assess risk");
  assert.ok(risk.evidence.some((e) => /independent assurance review at High.*independent challenge and independent assurance at Critical/.test(e)));
});

test("v3.9.2: pause wording follows Playbook §4.7.17 and the AIG-DEC-04 precautionary pause event (W-03, W-06)", () => {
  const found = getStageView("retrospective", 9).caseNote;
  assert.match(found, /pauses the use at once, without waiting for a decision \(Playbook §4\.7\.17\)/);
  assert.match(found, /“Precautionary pause \(containment\)” event with Outcome “Paused — pending decision”/);
  assert.match(found, /decided by the officer or forum with confirmed delegation/);
  assert.match(found, /AI Assurance Board may call for a pause and recommends, but does not decide/);
  assert.doesNotMatch(found, /must come from an authorised forum/);
  const monitor = stages.find((s) => s.title === "Monitor and respond");
  assert.match(monitor.note, /Precautionary pause \(containment\)/);
});

test("decision authority, go-live and pause wording match the v3.9.9 artefacts", () => {
  assert.match(stages[9].authority, /^The officer or forum with confirmed delegation/);
  assert.match(stages[9].authority, /AI Assurance Board advises.*does not decide/i);
  assert.match(stages[10].note, /go-live decision \(Gate 6\) is recorded in AIG-DEC-03 with the dated event in AIG-DEC-04/i);
  assert.match(stages[10].note, /not itself use permission/i);
  assert.doesNotMatch(stages[10].note, /Register to show Approved and Active for the authorised UC-ID/i);
  assert.match(stages[11].authority, /Service Owner or AI System Owner.*§4\.7\.17/);
  assert.match(JSON.stringify({ cases, stages }), /Decision with Outcome “Resume”/);
  assert.match(JSON.stringify({ cases, stages }), /short core record for every agent that can act.*full ASBOM at T3 and above/);
  assert.match(stages[7].record, /AIG-AIMS-05 AIMS Applicable Requirements and Change Register/);
  assert.match(stages[7].record, /AIG-AIMS-13 AI Source Assurance and Traceability Register/);
  assert.match(stages[6].record, /AIG-AGT-04 — Agent Record \(ASBOM\)/);
});

test("v3.9.1: the release handoff names the AIG-OPS-01 section 8 business continuity link", () => {
  const release = stages.find((s) => s.title === "Prepare release handoff");
  assert.match(release.record, /AIG-OPS-01 .*section 8 business continuity link, Proposed — for Council confirmation/);
  assert.match(release.record, /is this service a prioritised activity in the Council's business continuity plan\? Yes \/ No \/ Not known/);
});

test("v3.9.1: the agency-tier minimum stated for agentic cases includes T2 Medium (AIG-ASS-02 v1.9 row 82)", () => {
  const allText = JSON.stringify({ cases, stages });
  assert.match(allText, /T0 and T1 none; T2 Medium; T3 High; T4 High, or Critical without evidenced per-action human review; T5 Critical/);
});

test("Fast Track is described as a step within Intake (AIG-INV-02 v1.8, suite v3.9.7)", async () => {
  const src = (await import("node:fs")).readFileSync(new URL("../src/model.js", import.meta.url), "utf8");
  assert.ok(src.includes("as a step within AI Intake (AIG-INV-03)"));
  assert.ok(!src.includes("instead of the full Intake"));
});

test("Light-touch wording covers screening by reference and the Gate 1 and 3 rule (suite v3.9.8)", async () => {
  const src = (await import("node:fs")).readFileSync(new URL("../src/model.js", import.meta.url), "utf8");
  assert.ok(src.includes("can be done by reference to a current assessment"));
  assert.ok(src.includes("AIG-DEC-01 Gate 1 and 3 rule"));
  assert.ok(src.includes("completed or reviewed in the last 12 months"));
  assert.ok(src.includes("a new system always goes to Gate 1"));
});
