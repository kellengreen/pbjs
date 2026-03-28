export default class PbExtends extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("connectedCallback");
  }

  disconnectedCallback() {
    console.log("disconnectedCallback");
  }

  adoptedCallback() {
    console.log("adoptedCallback");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name}: ${oldValue} -> ${newValue}`);
  }

  // render() {
  //   // this.innerHTML = `<a`;
  //   // const a = document.createElement("a");
  //   // this.appendChild();
  //   // // if () {
  //   // // }
  // }
}

customElements.define("pb-extends", PbA);
