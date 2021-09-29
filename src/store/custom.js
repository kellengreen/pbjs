const store = new Store();
store.set(["a", "b", "c"], 10);
store.get(["a", "b", "c"]);
store.listen(["a", "b", "c"], () => {});
store.ignore(["a", "b", "c"], () => {});

store.a.b = 10;
store.a.b.c; // undefined
store.a.b.c.listen(() => {});

class Node {
  /**
   *
   * @param {Object} data
   */
  constructor(data = {}) {
    this.parent = undefined;
    this.data = init;
    this.childListeners = new WeakMap();
  }

  /**
   *
   * @param {*} keys
   * @param {*} value
   */
  set(keys, value) {
    for (const key of keys) {
    }
  }

  /**
   *
   * @name IDontReallyExist
   * @function
   * @param {String} someParameter Description
   *
   *
   * @param {string[]} keys
   * @param {function name(params)
   * @returns {undefined}
   */
  listen(keys) {}

  /**
   *
   * @param {string[]} keys
   * @returns {*}
   */
  get(keys) {}
}

const listen = Symbol("listen");
const ignore = Symbol("ignore");
const listeners = Symbol("listeners");
const parent = Symbol("parent");

/*
root = {
  a: {
    b: {
      c: 0
    }
  }
  d: 0
}

change
  a
    a
    b
    c
  b
    b
    c
  c
    c
  d
    d
*/
