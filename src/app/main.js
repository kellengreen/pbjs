import PbElement from "../pb/pb-element.js";

class MyThing extends PbElement {
  connectedCallback() {
    console.log("connected");
  }

  style = `
    * {
      
    }
    div {
      font-family: monospace;
      height: 200px;
      width: 300px;
      overflow: scroll;
      white-space: nowrap;
      border: 1px solid var(--white);
    }
  `;

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

MyThing.register();
