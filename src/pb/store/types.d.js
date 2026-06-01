import { listeners } from "./symbol";

/**
 * @typedef {(value: any) => undefined} listener
 */

/**
 * @typedef {Object} Watchable
 * @property {Map<PropertyKey,Set<listener>>} xxx
 * @property {boolean} hasPower - Indicates whether the Power component is present.
 * @property {boolean} hasWisdom - Indicates whether the Wisdom component is present.
 */

/**
 * @type Watchable
 */
const o = { hasPower: true, hasWisdom: false, [listeners]: "sd" };
