import PbElement from "./PbElement.js";

globalThis.addEventListener("popstate", (evt) => {
  console.log(evt);
});

export default class PbA extends PbElement {
  static observedAttributes = ["pb-href", "pb-replace"];

  constructor() {
    super();
    this.addEventListener("click", (evt) => {
      const data = null;
      const title = "";
      const url = this.getAttribute("pb-href");
      const replace = this.getAttribute("pb-replace") !== null;
      if (replace) {
        history.replaceState(data, title, url);
      } else {
        history.pushState(data, title, url);
      }
    });
  }

  connectedCallback() {
    // this.render();
  }

  disconnectedCallback() {}

  adoptedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log(`${name}: ${oldValue} -> ${newValue}`);
    // clearTimeout(this[state].timeout);
    // this[state].timeout = setTimeout(() => {
    //   console.log("DONE");
    // }, 0);
  }
}

customElements.define("pb-a", PbA);
