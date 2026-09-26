import test from "node:test";
import assert from "node:assert/strict";
import { cases, createIllustrativeOutcome, getStageView, recordBoundaries, stages } from "../src/model.js";

test("walkthrough retains four cases and a thirteen-stage connected lifecycle", () => {
  assert.equal(cases.length, 4);
  assert.equal(stages.length, 13);
  assert.equal(new Set(cases.map(({ id }) => id)).size, cases.length);
  assert.equal(stages[0].title, "Discover and intake");
  assert.match(stages[0].record, /04.*AI Intake Form/i);
  assert.equal(stages[1].title, "Map capabilities and system relationships");
  assert.match(stages[1].record, /Standalone proposed Capabilities and System Map/i);
  assert.equal(stages[2].title, "Confirm identity and scope");
  assert.match(stages[2].record, /05.*authorised Register/i);
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

test("record ownership keeps 05/36, 16 and 45 distinct", () => {
  assert.match(stages[5].record, /36.*separate Gate Log.*prospective Gate Plan/i);
  assert.match(stages[8].record, /36.*separate Gate Log.*dated Gate Events/i);
  assert.match(stages[9].record, /16.*formal decision.*36.*separate Gate Log.*event-linked conditions/i);
  assert.match(stages[1].note, /not a second Register.*approval/i);
  assert.match(recordBoundaries.find(({ number }) => number === "36").text, /separate 36 Gate Log/i);
  assert.match(recordBoundaries.find(({ number }) => number === "45").text, /owns agent permissions and delegations/i);
  assert.match(recordBoundaries.find(({ number }) => number === "05").text, /Council-issued AIR-ID/i);
  assert.match(recordBoundaries.find(({ number }) => number === "MAP").text, /relationship.pointer/i);
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
  assert.doesNotMatch(allText, /\bAIR-\d{4}-\d+\b/);
});