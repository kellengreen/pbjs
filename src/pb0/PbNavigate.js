import PbElement from "./PbElement.js";

navigation.addEventListener(
  "navigate",
  /**
   * @param {NavigateEvent} evt
   */
  (evt) => {
    if (evt.canIntercept) {
      evt.intercept();
    }
  },
);

export default class PbNavigate extends PbElement {
  connectedCallback() {
    this.addEventListener("click", this.onCLick);
    super.connectedCallback();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.onCLick);
    super.disconnectedCallback();
  }

  onCLick = async () => {
    const to = this.getAttribute("to");
    if (to) {
      const history = this.getAttribute("replace") === "" ? "replace" : "push";
      await navigation.navigate(to, {
        state: {},
        history,
      });
    }
  };
}

customElements.define("pb-navigate", PbNavigate);
