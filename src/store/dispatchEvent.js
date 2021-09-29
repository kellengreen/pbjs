const handlers = {
  /**
   * @param {Object} target
   * @param {string} property
   * @param {Proxy} receiver
   * @returns {*}
   */
  get: (target, property) => {
    const result = Reflect.get(target, property);
    if (result instanceof Function) {
      return result.bind(target);
    }
    return result;
  },

  /**
   * @param {Object} target
   * @param {string} property
   * @param {*} value
   * @param {Proxy} receiver
   * @returns {boolean}
   */
  set: (target, property, value) => {
    const init = { detail: value };
    const event = new CustomEvent(property, init);
    target.dispatchEvent(event);
    return Reflect.set(target, property, value);
  },
};

export default function store() {
  const target = new EventTarget();
  return new Proxy(target, handlers);
}
