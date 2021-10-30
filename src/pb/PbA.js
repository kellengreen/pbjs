import PbElement from "./PbElement.js";
import history from "./util/history.js";

export default class PbA extends PbElement {
  static observedAttributes = [
    ...this.observedAttributes,
    "pb-href",
    "pb-replace",
  ];

  constructor() {
    super();
    this.addEventListener("click", (evt) => {
      const url = this.getAttribute("pb-href");
      const replace = this.getAttribute("pb-replace") !== null;
      if (replace) {
        history.replaceState(null, "", url);
      } else {
        history.pushState(null, "", url);
      }
    });
  }

  connectedCallback() {
    console.log(this);
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
