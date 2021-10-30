export default class PbElement extends HTMLElement {
  static observedAttributes = ["XXX"];

  constructor() {
    super();
  }

  connectedCallback() {
    console.log("connected");
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  adoptedCallback() {
    console.log("adopted");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`attributeChangedCallback [${name}=${newValue}]`);
  }

  render = () => {};
}
