import store from "./store.js";

export default class PbElement extends HTMLElement {
  constructor() {
    super();
    this.state = store();
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
