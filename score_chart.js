class ScoreChart extends HTMLElement {
  constructor() {
    super();
    this.id = Date.now();
    this.min = 0;
    this.max = 100;
    this.current_value = 50;
    this.change = 0; // any negative, anypositive, or zero
    this.stops = 10; // including min and max
    this.begin_label = "start";
    this.end_label = "end";
  }

  // component attributes
  static get observedAttributes() {
    return [
      "id",
      "min",
      "max",
      "current_value",
      "change",
      "stops",
      "begin_label",
      "end_label",
    ];
  }

  connectedCallback() {
    this.min = Number.parseFloat(this.min);
    this.max = Number.parseFloat(this.max);
    this.current_value = Number.parseFloat(this.current_value);
    this.change = Number.parseFloat(this.change);
    this.stops = Number.parseFloat(this.stops);

    if (this.change < 0) {
    }
    const [change_icon, change_color] =
      this.change > 0
        ? ["trending_up", "success"]
        : this.change == 0
        ? ["trending_flat", "primary"]
        : ["trending_down", "error"];

    const percentage = Number.parseFloat(
      ((this.current_value - this.min) * 100) / (this.max - this.min),
    ).toPrecision(2);

    const steps = [];

    const pushStep = (value) => {
      steps.push(
        `<div class="steps">
          <span>${value}</span>
          <span class="dot">&#x2022;</span>
        </div>`,
      );
    };

    pushStep(this.min);
    const jump = Math.floor((this.max - this.min) / (this.stops - 1));
    for (let i = 1; i < this.stops - 1; ++i) {
      pushStep(this.min + jump * i);
    }
    pushStep(this.max);

    const innerHTML = `
    <div id="">
      <div class="main-label tw-gap-2">
      <span class="msicon notranslate tw-text-${change_color}">${change_icon}</span>
      <span>${this.current_value}</span>
      </div>
      <div class="stops">
        <div class="label-top">
          ${steps.join("")}
        </div>
        <div class="gradient label-middle">
        <div class="value dot" style="left: calc(${percentage}% - 9px) "></div>
        </div>
        <div class="label-bottom">
          <span>${this.begin_label}</span>
          <span>${this.end_label}</span>
        </div>
      </div>
    </div>
    `;

    this.innerHTML = innerHTML;

    // The below logic is to position the
    // gradient between the lables.
    const firstWidth = this.querySelector(".steps:first-child").offsetWidth;
    const lastWidth = this.querySelector(".steps:last-child").offsetWidth;
    const gradient = this.querySelector(".gradient");
    const offset = (firstWidth + lastWidth) / 2;
    const gradientWidth = `calc(100% - ${offset}px)`;

    this.querySelector(".gradient").style.width = gradientWidth;
  }

  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;
  }
}

customElements.define("score-chart", ScoreChart);
