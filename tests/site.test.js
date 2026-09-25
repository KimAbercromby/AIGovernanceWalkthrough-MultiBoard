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
  assert.match(copy, /proposed draft for owner review/i);
  assert.match(copy, /not approved or live/i);
  assert.match(copy, /Equality Act 2010 section 149/i);
  assert.match(copy, /Human Rights Act\s+1998\s+section 6/i);
  assert.match(copy, /EU AI Act, ATRS,\s*procurement/i);
  assert.match(copy, /27.*Applicable Requirements and Change Register/i);
  assert.match(copy, /42.*Source Assurance and Traceability Register/i);
  assert.match(copy, /does not decide whether a law applies/i);
  assert.doesNotMatch(copy, /\bAIR-\d{4}-\d+\b/);
});

test("draft handoffs do not claim live header verification or persistence", () => {
  assert.match(docs, /without verification against the exact current 05\/36 headers/i);
  assert.match(docs, /does not connect to the workbook or write\s+Council records/i);
  assert.match(app, /no 36 event or 16 decision is created/i);
});