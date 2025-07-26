import ListenersProxy from "./ListenersProxy.js";
import { listen, listeners } from "./symbols.js";

export const handlers = {
  /**
   * @param {Object} target
   * @param {string | Symbol} property
   * @param {Proxy} receiver
   * @returns {*}
   */
  get(target, property, receiver) {
    console.log(`get: ${property.toString()}`);

    const result = Reflect.get(target, property, receiver);

    return result;
  },

  /**
   * @param {Object} target
   * @param {string} property
   * @param {*} value
   * @param {Proxy} receiver
   * @returns {boolean}
   */
  set(target, property, value, receiver) {
    console.log(`set: ${property.toString()}`);

    if (value instanceof Object) {
      value = ObjectProxy(value);
    }

    return Reflect.set(target, property, value, receiver);
  },
};

export default function ObjectProxy(target = {}) {
  target[listeners] = ListenersProxy();
  target[listen] = 0;
  target[ignore] = 1;
  return new Proxy(target, handlers);
}
