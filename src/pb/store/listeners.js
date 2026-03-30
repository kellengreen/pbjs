import { listeners } from "./symbol.js";

/**
 * @this {Watchable}
 * @param {PropertyKey} key
 * @param {listener} listener
 * @returns {undefined}
 */
export function addListener(key, listener) {
  const map = this[listeners];
  if (map.has(key) === false) {
    map.set(key, new Set());
  }
  const set = map.get(key);
  set.add(listener);
}

/**
 * @this {Watchable}
 * @param {PropertyKey} key
 * @param {listener} listener
 * @returns {undefined}
 */
export function removeListener(key, listener) {
  const map = this[listeners];
  const set = map.get(key);
  if (set !== undefined) {
    set.delete(set, listener);
  }
}
