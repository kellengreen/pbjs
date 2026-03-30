import PbElement from "./PbElement.js";

export default class PbTemplate extends PbConditional {
  constructor() {
    super();
    this.template = this.firstElementChild;
    this.textContent = "";
  }
}
