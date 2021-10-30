import PbElement from "./PbElement.js";

export default class PbTemplate extends PbElement {
  constructor() {
    super();
    this.template = this.firstElementChild;
    if (!(this.template instanceof HTMLTemplateElement)) {
      throw new Error("The first element must be a template");
    }
    this.textContent = "";
  }
}
