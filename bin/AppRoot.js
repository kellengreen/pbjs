import e from"../pb/PbElement.js";import o from"../pb/tag/html.js";export default class t extends e{static style=`
    div {
      background-color: red;
    }
  `;render(){return o`
      <slot></slot>
      <div>
        <label>Vote</label>
        <button>CLICK ${0}</button>
      </div>
    `}}t.register();
//# sourceMappingURL=AppRoot.js.map
