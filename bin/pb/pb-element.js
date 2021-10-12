import t from"./store.js";export default class l extends HTMLElement{constructor(){super();this.state=t()}connectedCallback(){console.log("connected")}disconnectedCallback(){console.log("disconnected")}adoptedCallback(){console.log("adopted")}attributeChangedCallback(e,c,o){console.log(`attributeChangedCallback [${e}=${o}]`)}render=()=>{}}
//# sourceMappingURL=pb-element.js.map
