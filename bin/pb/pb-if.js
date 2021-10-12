export default class e extends HTMLElement{static name="pb-if";static observedAttributes=["cond"];constructor(){super();this.style.display="content",this.shadow=this.attachShadow({mode:"open"}),console.dir(this)}connectedCallback(){console.log("connected"),this.innerHTML=`
      <p>hello</p>
    `}disconnectedCallback(){console.log("disconnected")}adoptedCallback(){console.log("adopted")}attributeChangedCallback(t,o,n){console.log(`${t}: ${o} -> ${n}`)}}customElements.define(e.name,e);
//# sourceMappingURL=pb-if.js.map
