import { addListener, removeListener } from "./listeners.js";
import {
  ignore,
  listeners,
  listen,
  parent,
  wrapped,
  get,
  set,
  del,
} from "./symbol.js";

const handlers = {
  /**
   * @param {Object} target
   * @param {PropertyKey} property
   * @param {any} value
   * @param {any} receiver
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
   * @param {PropertyKey} property
   * @returns {boolean}
   */
  deleteProperty(target, property) {
    target[listeners];

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
