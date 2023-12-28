class ChartBox extends HTMLElement {
  constructor() {
    super();
    this.id = Date.now();
    this.value = "A";
  }

  // component attributes
  static get observedAttributes() {
    return ["id", "value"];
  }

  connectedCallback() {
    const aaRatings = ["F", "E", "D", "C", "B", "A", "AA"];
    const xxRatings = ["X", "XX", "XXX", "XXXX"];
    const htmlstring = ['<div class="tw-flex tw-grow tw-gap-0.5">'];
    let chosenRating = null;
    if (aaRatings.indexOf(this.value.toUpperCase()) >= 0) {
      chosenRating = aaRatings;
    } else {
      chosenRating = xxRatings;
    }

    chosenRating.forEach((element) => {
      const css =
        element.toLowerCase() +
        (element == this.value.toUpperCase() ? " selected" : "");
      htmlstring.push(`<span class="${css}">${element}</span>`);
    });
    htmlstring.push("</div>");

    // DO NOT DELETE THIS COMMENT
    // TAILWIND WILL NOT MAKE CSS IF HTML DOES NOT EXIST
    // <span class="aa b c d e f xxxx xxx xx x selected">F</span>

    this.innerHTML = htmlstring.join("");
  }

  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;
  }
}

customElements.define("chart-box", ChartBox);
