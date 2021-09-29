import PbElement from "./pb-element.js";

export default class PbTemplate extends PbElement {
  constructor() {
    super();
    this.state.template = this.firstElementChild;
    if (!(this.state.template instanceof HTMLTemplateElement)) {
      throw new Error("The first element must be a template");
    }
  }
}
