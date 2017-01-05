class Storage {

    constructor() {
        /**
         *
         */
        this[pb.symbol] = {
            'listeners': {}
        };
    }

    static isPrimitive(val) {
        /**
         * Primitive types: number, string, boolean, undefined, null, and symbol.
         */
        return val === null || typeof val !== 'object';
    }

    static listen(storage, path, callback) {
        /**
         * Add listener to storage instance
         */
        const listeners = storage[this.symbol].listeners;
		if (listeners[path] === undefined) {
		    listeners[path] = new Set()
        }
		listeners[path].add(callback);
    }

    static ignore(storage, path, callback) {
        /**
         * Remove listener from storage instance
         */
        const listeners = storage[this.symbol].listeners;
		if (listeners[path]) {
		    return listeners[path].delete(callback);
		}
        return false;
    }
}

const ref = Symbol('ref');
const parent = Symbol('parent');

const create = (val, target=undefined, key=undefined) => {
    console.log(`create: ${key}`);
    val[ref] = key;
    val[parent] = target;
    return new Proxy(val, {get, set});
}

const get = (target, key) => {
    console.log(`get: ${path(target, key)}`);
    return target[key];
}

const set = (target, key, val) => {
    console.log(`set: ${path(target, key)}`);
    if (val === null || typeof val !== 'object') {
        target[key] = val;
    } else {
        target[key] = create(val, target, key);
    }
    return true;
}

const path = (target, key) => {
    const keys = [];
    while (target[parent] !== undefined) {
        keys.unshift(target[ref]);
        target = target[parent];
    }
    keys.push(key);
    return keys.join('.');
}

