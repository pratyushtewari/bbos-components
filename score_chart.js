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
        <p>Rating</p>
        <div class="rating-stars">
            <div class="rating-star star-1 hw-text">star-1</div>
            <div class="rating-star star-2">star-2</div>
            <div class="rating-star star-3 hw-text">star-3</div>
            <div class="rating-star star-4">star-4</div>
            <div class="rating-star star-5 hw-text">star-5</div>
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
