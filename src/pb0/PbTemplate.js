import PbElement from "./PbElement.js";

export default class PbTemplate extends PbElement {
  /**
   *@type {Element|null}
   */
  template = null;

  connectedCallback() {
    if (this.firstElementChild instanceof HTMLTemplateElement) {
      console.log("run");
      const template = this.firstElementChild;
      const clone = template.cloneNode();
      console.log(clone);
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild();
    }
    super.connectedCallback();
  }
}

customElements.define("pb-template", PbTemplate);
