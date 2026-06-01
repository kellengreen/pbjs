/**
 * @name Bar
 * @type {symbol}
 */
const bar = Symbol("bar");

/**
 * @typedef {{
 *  foo: boolean,
 *  [Bar]: boolean,
 * }} Test
 */

/** @name Thing */
const thing = {
  /** @type {boolean} */
  [bar]: true,
};
