const listeners = Symbol("listeners");
const addEventListener = Symbol("addEventListener");
const removeEventListener = Symbol("removeEventListener");

function addEventListenerFn(key, listener) {
  console.log(this);
}

function removeEventListenerFn(key, listener) {
  console.log(this);
}

const handlers = {
  /**
   * @param {Object} target
   * @param {string} property
   * @param {Proxy} receiver
   * @returns {*}
   */
  get: (target, property, receiver) => {
    console.log(`get: ${property.toString()}`);

    const result = Reflect.get(target, property, receiver);

    // Bind funtions to the target instead of the receiver.
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

function wrapObject(obj) {
  obj[listeners] = new Set();
  obj[addEventListener] = addEventListenerFn;
  obj[removeEventListener] = removeEventListenerFn;
  return new Proxy(obj, handlers);
}

function wrapPrimitive(value) {}

globalThis.$ = wrapObject({ a: 0 });
globalThis.ael = addEventListener;
globalThis.rel = removeEventListener;
console.dir($);

/*
$.a = { b: 0}
$.a.b // 0
$a.b.c[ael]('foo', ()=>{})
*/
