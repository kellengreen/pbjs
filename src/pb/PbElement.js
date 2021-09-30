import camelToKebab from "./util/camelToKebab.js";

// __proto__ is the actual object that is used in the lookup chain
// prototype is the object that is used to build __proto__ when you create an object with new.

export default class PbElement extends HTMLElement {
  static props = {};
  static style = "";
  static _style = "";
  static _styleSheets = [];

  /**
   *
   */
  static register() {
    const name = camelToKebab(this.name);
    customElements.define(name, this);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // TODO: Move to CSSStyleSheet when support lands.
    if (this.constructor.style) {
      const style = document.createElement("style");
      style.textContent = this.constructor.style;
      this.shadowRoot.appendChild(style);
    }
  }

  render() {
    return "";
  }

  connectedCallback() {
    const children = this.render();
    this.shadowRoot.append(...children);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`attributeChangedCallback [${name}=${newValue}]`);
  }
}
