import PbElement from "../pb/PbElement.js";

import html from "../pb/tag/html.js";

export default class AppRoot extends PbElement {
  static style = `
    div {
      background-color: red;
    }
  `;
  render() {
    return html`
      <slot></slot>
      <div>
        <label>Vote</label>
        <button>CLICK ${0}</button>
      </div>
    `;
  }
}

AppRoot.register();
