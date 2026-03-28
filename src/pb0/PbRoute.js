import PbTemplate from "./PbTemplate.js";

export default class PbRoute extends PbTemplate {
  static observedAttributes = ["path"];

  connectedCallback() {
    navigation.addEventListener("navigate", this.onNavigate);
    super.connectedCallback();
  }

  disconnectedCallback() {
    navigation.removeEventListener("navigate", this.onNavigate);
    super.disconnectedCallback();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  render = () => {
    this.textContent = "";
    if (globalThis.location.pathname === this.getAttribute("path")) {
      const clone = this.template.content.cloneNode(true);
      this.appendChild(clone);
    }
  };

  onNavigate = (evt) => {
    console.log(evt);
  };
}
