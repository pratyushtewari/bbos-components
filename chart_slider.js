class ChartSlider extends HTMLElement {
  constructor() {
    super();
    this.id = Date.now();
    this.min = 0;
    this.max = 100;
    this.current_value = 50;
    this.change = ""; // any negative, anypositive, or zero, "" for hiding it
    this.stops = 10; // including min and max
    this.stops_labels = "";
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
      "stops_labels",
      "begin_label",
      "end_label",
    ];
  }

  connectedCallback() {
    const min = Number.parseFloat(this.min);
    const max = Number.parseFloat(this.max);
    const current_value = Number.parseFloat(this.current_value);

    const isNaN = Number.isNaN(min && max && current_value);
    if (isNaN) {
      console.error(
        `ChartSlider: min:[${this.min}], max:[${this.max}] or current_value:[${this.current_value}] is not a number.`,
      );
    }

    let trend_arrrow_HTML = "";
    if (this.change != "") {
      this.change = Number.parseFloat(this.change);
      const [change_icon, change_color] =
        this.change > 0
          ? ["trending_up", "success"]
          : this.change == 0
          ? ["trending_flat", "primary"]
          : ["trending_down", "error"];
      trend_arrrow_HTML = `<span class="msicon notranslate tw-text-${change_color}">${change_icon}</span>`;
    }
    this.stops = Number.parseFloat(this.stops);

    const percentage = Number.parseFloat(
      ((current_value - min) * 100) / (max - min),
    ).toPrecision(2);

    const current_location_html =
      (current_value >= min && current_value <= max)
        ? `<div class="value dot" style="left: calc(${percentage}% - 9px) "></div>`
        : ``;

    const steps = [];
    const pushStep = (value) => {
      steps.push(
        `<div class="steps">
          <span>${value}</span>
          <span class="dot">&#x2022;</span>
        </div>`,
      );
    };

    if (this.stops_labels) {
      const labels = this.stops_labels.split(",");
      labels.forEach((label) => {
        pushStep(label.trim());
      });
    } else {
      pushStep(min);
      const jump = (max - min) / (this.stops - 1);
      for (let i = 1; i < this.stops - 1; ++i) {
        pushStep(Math.round((min + jump * i) * 100) / 100);
      }
      pushStep(max);
    }

    const innerHTML = !isNaN
      ? `
    <div id="">
      <div class="current-value tw-gap-2">
        ${trend_arrrow_HTML}
        <span>${current_value}</span>
      </div>
      <div class="stops">
        <div class="label-top">
          ${steps.join("")}
        </div>
        <div class="gradient label-middle">
          ${current_location_html}
        </div>
        <div class="label-bottom">
          <span>${this.begin_label}</span>
          <span>${this.end_label}</span>
        </div>
      </div>
    </div>
    `
      : `
    <div id="">
      <div class="current-value tw-gap-2">

        <span>N/A</span>
      </div>
      <div class="stops">
        <div class="label-top">
        &nbsp;
        </div>
        <div class="gradient label-middle">
        </div>
        <div class="label-bottom">
          <span> &nbsp;</span>
          <span> &nbsp;</span>
        </div>
      </div>
    </div>`;

    this.innerHTML = innerHTML;

    // The below logic is to position the
    // gradient between the lables.
    const firstWidth = this.querySelector(".steps:first-child").offsetWidth;
    const lastWidth = this.querySelector(".steps:last-child").offsetWidth;
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

customElements.define("chart-slider", ChartSlider);
