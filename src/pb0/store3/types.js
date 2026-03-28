/**
 * @typedef {string|Symbol} key
 */

/**
 * @typedef {(any) => undefined} listener
 * @typedef {string|Symbol} key
 */

/**
 * @typedef {Object} Watchable
 * @property {Map<key,Set<listener>>} [Symbol.for('listeners')]
 * @property {boolean} hasPower - Indicates whether the Power component is present.
 * @property {boolean} hasWisdom - Indicates whether the Wisdom component is present.
 */
