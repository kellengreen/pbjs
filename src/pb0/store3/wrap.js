import { listen, removeListener } from "./listeners.js";
import { ignore, listeners, parent, wrapped } from "./symbol.js";

const handlers = {
  /**
   * @param {Object} target
   * @param {key} property
   * @param {unknown} receiver
   * @returns {any}
   */
  get(target, property, receiver) {
    console.log(`get: ${property.toString()}`);
    return Reflect.get(target, property, receiver);
  },

  /**
   * @param {Object} target
   * @param {key} property
   * @param {any} value
   * @param {Proxy} receiver
   * @returns {boolean}
   */
  set(target, property, value, receiver) {
    console.log(`set: ${property.toString()}`);

    if (value instanceof Object) {
      if (value[wrapped] !== true) {
        value = wrap(value, [target, property]);
      } else {
        if (value[parent]) {
        }
        // null;
      }
    }
    // const event = new CustomEvent(property, init);
    // target.dispatchEvent(event);

    return Reflect.set(target, property, value, receiver);
  },

  /**
   * @param {Object} target
   * @param {key} property
   * @returns {boolean}
   */
  deleteProperty(target, property) {
    return Reflect.deleteProperty(target, property);
  },
};

/**
 * @param {Object} target
 * @param {null|[Object, key]} parent
 * @returns {Object}
 */
export default function wrap(target = {}, parentKV = null) {
  Object.defineProperties(target, {
    [wrapped]: {
      value: true,
    },
    [listen]: {
      value: addListener.bind(target),
    },
    [ignore]: {
      value: removeListener.bind(target),
    },
    [listeners]: {
      value: new Map(),
    },
    [parent]: {
      value: parentKV,
      writable: true,
    },
    [get]: {
      value: undefined,
    },
    [set]: {
      value: undefined,
    },
    [del]: {
      value: undefined,
    },
  });

  return new Proxy(target, handlers);
}

const d = wrap(0);
console.log(d);
