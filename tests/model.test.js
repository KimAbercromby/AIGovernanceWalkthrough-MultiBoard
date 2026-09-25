import test from "node:test";
import assert from "node:assert/strict";
import { cases, createIllustrativeOutcome, getStageView, recordBoundaries, stages } from "../src/model.js";

test("walkthrough retains four cases and a twelve-stage connected lifecycle", () => {
  assert.equal(cases.length, 4);
  assert.equal(stages.length, 12);
  assert.equal(new Set(cases.map(({ id }) => id)).size, cases.length);
  assert.equal(stages[0].title, "Discover and intake");
  assert.equal(stages.at(-1).title, "Re-enter, retire and close");
});

test("case-specific notes tailor the route without deciding risk or applicability", () => {
  assert.match(getStageView("staff-assistant", 3).caseNote, /is screened/i);
  assert.match(getStageView("agentic", 5).caseNote, /does not.*assign.*tier|Do not use this illustration to assign/i);
  assert.match(getStageView("resident-service", 6).caseNote, /Confirm.*requirements/i);
  assert.match(getStageView("retrospective", 0).caseNote, /Do not backdate/i);
  assert.throws(() => getStageView("unknown", 0), RangeError);
});

test("record ownership keeps 05/36, 16 and 45 distinct", () => {
  assert.match(stages[4].record, /36.*prospective Gate Plan/i);
  assert.match(stages[7].record, /36.*dated Gate Events/i);
  assert.match(stages[8].record, /16.*formal decision.*36.*event-linked conditions/i);
  assert.match(recordBoundaries.find(({ number }) => number === "45").text, /owns agent permissions and delegations/i);
  assert.match(recordBoundaries.find(({ number }) => number === "05").text, /Council-issued AIR-ID/i);
});

test("illustrative responses are explicit handoffs and never approval or saved rows", () => {
  const condition = createIllustrativeOutcome("condition", 6);
  const evidence = createIllustrativeOutcome("evidence", 8);
  assert.match(condition.text, /authorised decision-maker/i);
  assert.match(condition.text, /Nothing was saved/i);
  assert.match(evidence.text, /not a real gate outcome/i);
  assert.match(evidence.text, /nothing was saved/i);
  assert.throws(() => createIllustrativeOutcome("approval", 4), TypeError);
  assert.throws(() => createIllustrativeOutcome("condition", 12), RangeError);
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