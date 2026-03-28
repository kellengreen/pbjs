export default class PbIf extends HTMLElement {
  static name = "pb-if";
  static observedAttributes = ["cond"];

  constructor() {
    super();

    this.style.display = "content";
    this.shadow = this.attachShadow({ mode: "open" });

    console.dir(this);
  }

  connectedCallback() {
    console.log("connected");
    this.innerHTML = `
      <p>hello</p>
    `;
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
}

customElements.define(PbIf.name, PbIf);
