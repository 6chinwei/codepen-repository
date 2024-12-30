document.getElementById("name-input").addEventListener("input", function () {
  const newName = document.querySelector("#name-input").value;
  const $helloCard = document.querySelector("hello-card");

  $helloCard.setAttribute("name", newName);
});

/* Scripts of <hello-card> */
class HelloCard extends HTMLElement {
  DEFAULT_FONT_SIZE = 48; // px
  MIN_FONT_SIZE = 16; // px
  FONT_SIZE_ADJUSTMENT_STEP = 4; // px

  static observedAttributes = ["name"];

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const templateContent = document.querySelector("#card-template").content;

    shadow.appendChild(templateContent.cloneNode(true));

    this.$card = this.shadowRoot.querySelector("#card");
    this.$name = this.shadowRoot.querySelector("#name");
  }

  connectedCallback() {
    this.updateName();
    this.updateDebugInfo();
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName === "name") {
      this.updateName();
      this.updateDebugInfo();
    }
  }

  updateName() {
    this.$name.textContent = this.getAttribute("name");

    this.adjustFontSize();
  }

  adjustFontSize() {
    let fontSize = this.DEFAULT_FONT_SIZE;

    // Reset font size to default
    this.setNameFontSize(fontSize);

    // Decrease font size until the name fits within the card width
    while (
      this.$name.scrollWidth > this.getMaxNameWidth() &&
      fontSize > this.MIN_FONT_SIZE
    ) {
      fontSize -= this.FONT_SIZE_ADJUSTMENT_STEP;
      this.setNameFontSize(fontSize);
    }
  }

  setNameFontSize(fontSize) {
    this.$card.style.setProperty("--name-font-size", `${fontSize}px`);
  }

  getMaxNameWidth() {
    const cardWidth = this.$card.clientWidth;
    const cardPadding =
      parseInt(this.getStyle(this.$card, "padding-left"), 0) +
      parseInt(this.getStyle(this.$card, "padding-right"), 0);

    return cardWidth - cardPadding;
  }

  getStyle($element, property) {
    return window.getComputedStyle($element).getPropertyValue(property);
  }

  updateDebugInfo() {
    const $debug = this.shadowRoot.querySelector("#debug");

    $debug.innerHTML = `
      Adjusted font size = ${this.getStyle(this.$card, "--name-font-size")}<br>
      Current name width = ${this.$name.scrollWidth}px<br>
      Max name width = ${this.getMaxNameWidth()}px<br>
    `;
  }
}

customElements.define("hello-card", HelloCard);
