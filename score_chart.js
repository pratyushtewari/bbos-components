class ScoreChart extends HTMLElement {
  constructor() {
    super();
    this.min = 0;
    this.max = 100;
    this.score = 50;
    this.direction = 0; // any negative, anypositive, or zero
    this.stops = 10; // including min and max
    this.begin_label = "Begin";
    this.end_label = "End";
  }

  // component attributes
  static get observedAttributes() {
    return ["score"];
  }

  connectedCallback() {
    const scoreChartTemplate = document.createElement("template");
    scoreChartTemplate.id = "score_chart_template";
    scoreChartTemplate.innerHTML = `
    <div>
      <div class="main-label">
        <span>323</span>
        <span class="msicon notranslate tw-text-success"
          >arrow_upward</span
        >
      </div>
      <div class="stops">
        <div class="label-top">
          <span>0</span>
          <span>100</span>
          <span>200</span>
          <span>300</span>
          <span>400</span>
          <span>500</span>
        </div>
        <div class="gradient label-middle">
          <span>&#x2022;</span>
          <span>&#x2022;</span>
          <span>&#x2022;</span>
          <span>&#x2022;</span>
          <span>&#x2022;</span>
          <span>&#x2022;</span>
        </div>
        <div class="value msicon notranslate" style="left: 50%">
          adjust
        </div>
        <div class="label-bottom">
          <span>Risky</span>
          <span>Safe</span>
        </div>
      </div>
    </div>
    `;
    const clonedTemplate = scoreChartTemplate.content.cloneNode(true),
      hwMsg = `Hello ${this.score}`;

    const temp = document.importNode(scoreChartTemplate.content, true);

    Array.from(temp.querySelectorAll(".hw-text")).forEach(
      (n) => (n.textContent = hwMsg),
    );

    this.appendChild(temp);
    // shadow.append(template);
  }

  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;
  }
}

customElements.define("score-chart", ScoreChart);
