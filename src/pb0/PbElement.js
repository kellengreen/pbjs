export default class PbElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("connected");
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  connectedMoveCallback() {
    console.log("connectedMove");
  }

  adoptedCallback() {
    console.log("adopted");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`attributeChangedCallback [${name}=${newValue}]`);
  }

  onClick = () => {};
}
