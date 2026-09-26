import test from "node:test";
import assert from "node:assert/strict";
import { cases, createIllustrativeOutcome, getStageView, recordBoundaries, stages } from "../src/model.js";

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
  assert.match(getStageView("staff-assistant", 5).caseNote, /proper planning record/i);
  assert.equal(getStageView("staff-assistant", 8).caseNote, null);
  assert.match(getStageView("agentic", 6).caseNote, /does not.*assign.*tier|Do not use this illustration to assign/i);
  assert.match(getStageView("resident-service", 7).caseNote, /Confirm.*requirements/i);
  assert.match(getStageView("retrospective", 0).caseNote, /Do not backdate/i);
  assert.throws(() => getStageView("unknown", 0), RangeError);
});

test("record ownership keeps Register, Gate Log, decision and Agent Record distinct", () => {
  assert.match(stages[5].record, /AIG-DEC-04.*separate Gate Log.*prospective Gate Plan/i);
  assert.match(stages[8].record, /AIG-DEC-04.*separate Gate Log.*dated Gate Events/i);
  assert.match(stages[9].record, /AIG-DEC-03.*formal decision.*AIG-DEC-04.*separate Gate Log.*event-linked conditions/i);
  assert.match(stages[1].note, /not a second Register.*approval/i);
  assert.match(recordBoundaries.find(({ number }) => number === "AIG-DEC-04").text, /separate proposed AIG-DEC-04 Gate Log/i);
  assert.match(recordBoundaries.find(({ number }) => number === "AIG-AGT-04").text, /owns agent permissions and delegations/i);
  assert.match(recordBoundaries.find(({ number }) => number === "AIG-INV-04").text, /Council-issued AIR-ID/i);
  assert.match(recordBoundaries.find(({ number }) => number === "AIG-INV-05").text, /relationship.pointer/i);
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