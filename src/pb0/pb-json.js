import {} from "./globalStore.js";

export default class PbJson extends HTMLElement {
  static tag = "pb-json";
  static observedAttributes = ["json"];

  constructor() {
    super();

    this.style.display = "content";
    this.shadow = this.attachShadow({ mode: "open" });

    console.dir(this);
  }

  connectedCallback() {
    console.log("connected");
    // this.innerHTML = `
    //   <p>hello</p>
    // `;
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  adoptedCallback() {
    console.log("adopted");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "listen") {
    }
    console.log(`${name}: ${oldValue} -> ${newValue}`);
  }

  onClick = () => {};
}

customElements.define(PbJson.tag, PbJson);
