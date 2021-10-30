// import {} from "./util/PopStatePatch.js";
import PbTemplate from "./PbTemplate.js";

export default class PbRoute extends PbTemplate {
  static observedAttributes = ["pb-path"];

  connectedCallback() {
    super.connectedCallback();
    addEventListener("popstate", this.render);
    this.render();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    removeEventListener("popstate", this.render);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  render = () => {
    this.textContent = "";
    if (globalThis.location.pathname === this.getAttribute("pb-path")) {
      const clone = this.template.content.cloneNode(true);
      this.appendChild(clone);
    }
  };
}

customElements.define("pb-route", PbRoute);
