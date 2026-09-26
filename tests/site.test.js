import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const page = await readFile(new URL("../index.html", import.meta.url), "utf8");
const docs = await readFile(new URL("../README.md", import.meta.url), "utf8");
const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

test("static entry point references the maintainable local application assets", () => {
  assert.match(page, /href="\.\/styles\.css"/);
  assert.match(page, /src="\.\/src\/app\.js"/);
  assert.match(page, /id="case-list"/);
  assert.match(page, /id="stage-list"/);
  assert.match(page, /id="record-thread"/);
  assert.match(page, /id="record-grid"/);
  assert.doesNotMatch(page, /<script[^>]+src="https?:\/\//i);
});

test("public copy states the proposed-draft status and record/legal boundaries", () => {
  const copy = `${page}\n${docs}`;
  assert.match(copy, /proposed draft for Council review/i);
  assert.match(copy, /not approved or live/i);
  assert.match(page, /Council-issued AIR-ID remains its identity in AIG-INV-04/i);
  assert.match(page, /AIG-DEC-04 holds plans, dated events and event-linked conditions/i);
  assert.match(page, /formal decisions stay in AIG-DEC-03 or approved minutes/i);
  assert.match(page, /AIG-INV-05 is only a descriptive controlled artefact in the proposed catalogue—it is not adopted/i);
  assert.match(page, /does not share or transfer case data to or from them/i);
  assert.match(page, /each materially different use.*own UC-ID/i);
  assert.match(page, /system-level status does not establish approval for any use/i);
  assert.match(page, /Every use-specific decision and any conditions must be verified against.*UC-specific records/i);
  assert.match(page, /UC decision is unverified, even for ordinary non-agentic use/i);
  assert.match(page, /Missing or conflicting identifiers\/statuses are unverified/i);
  assert.match(app, /Identity persists/);
  assert.match(app, /no data is shared or transferred/i);
  assert.match(app, /DISTINCT MATERIAL USES.*EACH NEEDS ITS OWN UC-ID/i);
  assert.match(app, /no approval authority is implied/i);
  assert.match(copy, /does\s+not\s+connect to workbooks or write Council records/i);
  assert.match(copy, /not a second Register/i);
  assert.match(copy, /not a second Register[\s\S]*approval/i);
  assert.match(copy, /Equality Act 2010 section 149/i);
  assert.match(copy, /Human Rights Act\s+1998\s+section 6/i);
  assert.match(copy, /EU AI Act, ATRS,\s*procurement/i);
  assert.match(copy, /AIG-AIMS-05.*Applicable Requirements and Change Register/i);
  assert.match(copy, /AIG-AIMS-13.*Source Assurance and Traceability Register/i);
  assert.match(copy, /does not decide whether a law applies/i);
  assert.match(page, /Governance\s+<b>Walkthrough<\/b>/);
  assert.doesNotMatch(copy, /\bWestminster\b|London borough/i);
  assert.doesNotMatch(copy, /\bAIR-\d{4}-\d+\b/);
});

test("draft handoffs do not claim live workbook integration or persistence", () => {
  assert.match(docs, /does\s+not\s+connect to workbooks or write Council records/i);
  assert.match(docs, /relationship pointer, not an\s+authoritative register/i);
  assert.match(docs, /including ordinary non-agentic use/i);
  assert.match(docs, /system-level status does not\s+establish a decision for any UC-ID/i);
  assert.match(docs, /every UC decision—including ordinary non-agentic use—is\s+unverified/i);
  assert.doesNotMatch(`${page}\n${docs}\n${app}`, /approved baseline/i);
  assert.match(app, /no AIG-DEC-04 event or AIG-DEC-03 decision is created/i);
});