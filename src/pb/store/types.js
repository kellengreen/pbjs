/**
 * @typedef {(any) => undefined} listener
 */

/**
 * @typedef {Object} Watchable
 * @property {Map<Prop,Set<listener>>} [Symbol.for('listeners')]
 * @property {boolean} hasPower - Indicates whether the Power component is present.
 * @property {boolean} hasWisdom - Indicates whether the Wisdom component is present.
 */
