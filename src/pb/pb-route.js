import {} from "./PopStatePatch.js";
import PbTemplate from "./pb-template.js";

export default class PbRoute extends PbTemplate {
  static observedAttributes = ["path"];

  connectedCallback() {
    super.connectedCallback();
    addEventListener("popstate", this.render);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    removeEventListener("popstate", this.render);
  }

  adoptedCallback() {
    super.adoptedCallback();
    console.log("adopted");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    this.render();
  }

  render = () => {
    console.log(this.state);
    if (globalThis.location.pathname === this.getAttribute("path")) {
      this.innerHTML = this.state.template.innerHTML;
    } else {
      this.innerHTML = "";
    }
  };
}

customElements.define("pb-route", PbRoute);
