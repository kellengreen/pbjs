export default class PbIf extends HTMLElement {
  static name = "pb-if";
  static observedAttributes = ["cond"];

  constructor() {
    super();
  }

  connectedCallback() {
    console.log("connected");
    this.render();
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  adoptedCallback() {
    console.log("adopted");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name}: ${oldValue} -> ${newValue}`);
  }

  render() {
    // if () {
    // }
  }
}

customElements.define(PbIf.name, PbIf);
