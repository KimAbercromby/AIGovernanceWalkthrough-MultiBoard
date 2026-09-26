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
  assert.match(page, /id="record-grid"/);
  assert.doesNotMatch(page, /<script[^>]+src="https?:\/\//i);
});

test("public copy states the proposed-draft status and record/legal boundaries", () => {
  const copy = `${page}\n${docs}`;
  assert.match(copy, /proposed draft for Council review/i);
  assert.match(copy, /not approved or live/i);
  assert.match(copy, /AIG-INV-03 intake.*proposed controlled artefact AIG-INV-05.*AIG-INV-04 Register/i);
  assert.match(copy, /separate proposed AIG-DEC-04 Gate Log/i);
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
  assert.match(app, /no AIG-DEC-04 event or AIG-DEC-03 decision is created/i);
});