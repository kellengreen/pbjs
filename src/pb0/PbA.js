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

export default class PbA extends PbElement {
  connectedCallback() {
    this.addEventListener("click", this.onCLick);
    super.connectedCallback();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.onCLick);
    super.disconnectedCallback();
  }

  onCLick = async () => {
    const href = this.getAttribute("href");
    if (href) {
      const history = this.getAttribute("replace") === "" ? "replace" : "push";
      await navigation.navigate(href, { history });
    }
  };
}

customElements.define("pb-a", PbNavigate);
