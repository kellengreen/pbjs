// listeners
export const listen = Symbol("listen");
export const ignore = Symbol("ignore");

/**
 * @type {unique symbol}
 */
export const listeners = Symbol("listeners");
export const parent = Symbol("parent");

// Proxy
export const wrapped = Symbol("wrapped");

// Methods
export const get = Symbol("get");
export const set = Symbol("set");
export const del = Symbol("del");
