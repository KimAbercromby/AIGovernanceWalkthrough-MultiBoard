import {
  cases,
  createIllustrativeOutcome,
  getStageView,
  recordBoundaries,
  stages
} from "./model.js";

const byId = (id) => {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Walkthrough is missing the required #${id} element.`);
  return element;
};

const state = { caseId: cases[0].id, stageIndex: 0, outcome: null };
const caseList = byId("case-list");
const caseSummary = byId("case-summary");
const stageCount = byId("stage-count");
const progressBar = byId("progress-bar");
const stageList = byId("stage-list");
const stageDetail = byId("stage-detail");
const previousButton = byId("previous-stage");
const nextButton = byId("next-stage");

const renderCases = () => {
  caseList.innerHTML = cases.map((example) => `
    <button class="case-option ${example.id === state.caseId ? "is-selected" : ""}" type="button"
      data-case="${example.id}" aria-pressed="${example.id === state.caseId}">
      <span class="case-number">${example.number}</span>
      <span><b>${example.title}</b><small>${example.short}</small></span>
      <span class="case-chevron" aria-hidden="true">›</span>
    </button>`).join("");
};

const renderSummary = () => {
  const example = cases.find((item) => item.id === state.caseId);
  caseSummary.innerHTML = `
    <div class="summary-copy">
      <span class="route-label">${example.type}</span>
      <h3>${example.title}</h3>
      <p>${example.description}</p>
      <p class="case-emphasis"><b>Route context</b> · ${example.route}<br>${example.emphasis}</p>
    </div>
    <div class="summary-badge"><span>EXAMPLE</span><b>${example.number}</b><small>NOT A LIVE CASE</small></div>`;
};

const renderStageNavigation = () => {
  stageList.innerHTML = stages.map((stage, index) => `
    <li class="${index === state.stageIndex ? "is-current" : ""} ${index < state.stageIndex ? "is-explored" : ""}">
      <button type="button" data-stage="${index}" aria-current="${index === state.stageIndex ? "step" : "false"}">
        <span class="step-number">${String(index + 1).padStart(2, "0")}</span>
        <span>${stage.title}</span>
        ${index < state.stageIndex ? '<span class="explored-mark" aria-label="Explored">✓</span>' : ""}
      </button>
    </li>`).join("");
};

const renderStageDetail = () => {
  const stage = getStageView(state.caseId, state.stageIndex);
  const canExploreOutcome = state.stageIndex >= 4 && state.stageIndex <= 10;
  stageDetail.setAttribute("tabindex", "-1");
  stageDetail.innerHTML = `
    <div class="stage-topline">
      <span class="stage-number">STAGE ${String(state.stageIndex + 1).padStart(2, "0")}</span>
      <span class="stage-state">ILLUSTRATIVE · NOT RECORDED</span>
    </div>
    <h3>${stage.title}</h3>
    <div class="question-card"><span class="mini-label">DECISION QUESTION</span><p>${stage.question}</p></div>
    <div class="stage-meta">
      <div><span class="mini-label">ACCOUNTABLE ROUTE / AUTHORITY</span><p>${stage.authority}</p></div>
      <div><span class="mini-label">RECORD DESTINATION</span><p>${stage.record}</p></div>
    </div>
    <div class="stage-block">
      <span class="mini-label">EVIDENCE TO CHECK</span>
      <ul class="evidence-list">${stage.evidence.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
    <div class="handoff-card">
      <span class="handoff-icon" aria-hidden="true">↗</span>
      <div><span class="mini-label">HANDOFF</span><p>${stage.handoff}</p></div>
    </div>
    ${stage.caseNote ? `<p class="case-stage-note"><b>For this example:</b> ${stage.caseNote}</p>` : ""}
    <div class="stage-output"><span class="mini-label">ILLUSTRATIVE OUTPUT</span><p>${stage.output}</p><p class="stage-note">${stage.note}</p></div>
    ${canExploreOutcome ? `
      <div class="decision-explorer">
        <div><b>Explore a gate response</b><span>Demonstration only; no AIG-DEC-04 event or AIG-DEC-03 decision is created.</span></div>
        <div class="decision-buttons">
          <button class="button button-small button-outline" type="button" data-outcome="condition">Illustrate a condition</button>
          <button class="button button-small button-outline" type="button" data-outcome="evidence">Return for evidence</button>
        </div>
        ${state.outcome ? `<div class="outcome-note" role="status"><b>${state.outcome.title}</b><p>${state.outcome.text}</p></div>` : ""}
      </div>` : ""}`;
};

const render = () => {
  const lastStage = stages.length - 1;
  renderCases();
  renderSummary();
  renderStageNavigation();
  renderStageDetail();
  stageCount.textContent = `Stage ${String(state.stageIndex + 1).padStart(2, "0")} of ${String(stages.length).padStart(2, "0")}`;
  progressBar.style.width = `${((state.stageIndex + 1) / stages.length) * 100}%`;
  previousButton.disabled = state.stageIndex === 0;
  nextButton.disabled = state.stageIndex === lastStage;
  nextButton.textContent = state.stageIndex === lastStage ? "End of lifecycle" : "Next stage →";
};

caseList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-case]");
  if (!button) return;
  state.caseId = button.dataset.case;
  state.outcome = null;
  render();
});

stageList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-stage]");
  if (!button) return;
  state.stageIndex = Number(button.dataset.stage);
  state.outcome = null;
  render();
  stageDetail.focus({ preventScroll: true });
});

stageDetail.addEventListener("click", (event) => {
  const button = event.target.closest("[data-outcome]");
  if (!button) return;
  state.outcome = createIllustrativeOutcome(button.dataset.outcome, state.stageIndex);
  renderStageDetail();
});

previousButton.addEventListener("click", () => {
  if (state.stageIndex > 0) {
    state.stageIndex -= 1;
    state.outcome = null;
    render();
  }
});

nextButton.addEventListener("click", () => {
  if (state.stageIndex < stages.length - 1) {
    state.stageIndex += 1;
    state.outcome = null;
    render();
  }
});

const recordGrid = byId("record-grid");
recordGrid.innerHTML = recordBoundaries.map((record) => `
  <article class="record-card record-${record.color}">
    <div class="record-card-top"><span class="record-number">${record.number}</span><span class="mini-label">${record.label}</span></div>
    <h3>${record.title}</h3><p>${record.text}</p>
  </article>`).join("");

render();