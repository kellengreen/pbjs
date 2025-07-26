import { listen, listeners, ignore, wildcard } from "./symbols.js";

const handlers = {
  /**
   * @param {Object} target
   * @param {string | Symbol} property
   * @param {Proxy} receiver
   * @returns {*}
   */
  get: (target, property, receiver) => {
    console.log(`get: ${property.toString()}`);

    const result = Reflect.get(target, property, receiver);

    // // Bind funtions to the target instead of the receiver.
    // if (result instanceof Function) {
    //   return result.bind(target);
    // }

    return result;
  },

  /**
   * @param {Object} target
   * @param {string | Symbol} property
   * @param {*} value
   * @param {Proxy} receiver
   * @returns {boolean}
   */
  set: (target, property, value, receiver) => {
    console.log(`set: ${property.toString()}`);

    if (value instanceof Object) {
      target[property] = wrapObject(value);
    } else {
      target[property] = wrapPrimitive(value);
    }
    // const event = new CustomEvent(property, init);
    // target.dispatchEvent(event);
    return Reflect.set(target, property, value, receiver);
  },
};

export default function ListenersProxy() {
  return new Proxy(new Map(), handlers);
}
