import"./globalStore.js";export default class o extends HTMLElement{static tag="pb-json";static observedAttributes=["json"];constructor(){super();this.style.display="content",this.shadow=this.attachShadow({mode:"open"}),console.dir(this)}connectedCallback(){console.log("connected")}disconnectedCallback(){console.log("disconnected")}adoptedCallback(){console.log("adopted")}attributeChangedCallback(t,e,s){console.log(`${t}: ${e} -> ${s}`)}onClick=()=>{}}customElements.define(o.tag,o);
//# sourceMappingURL=pb-json.js.map
