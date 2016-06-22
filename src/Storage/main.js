//=require ../global/main.js

pb.Storage = class {
    /**
     *
     */
    constructor() {
        /**
         *
         */
        this[pb.Storage.symbol] = {
            'listeners': {}
        };
    }

    static get new() {
        /**
         *
         */
        const storage = new this;
        return new Proxy(storage, {
            get: this.get.bind(this),
            set: this.set.bind(this)
        });
    }

    static get(target, path) {
        /**
         * Trap for get requests on storage instances
         */
        console.log(`get: ${path.toString()}`);
        return target[path];
    }

    static set(target, path, value) {
        /**
         * Trap for Set requests to storage instances
         */
        console.log(`set: ${path}`);
        target[path] = value;

        const listeners = target[this.symbol].listeners;

        if (listeners[path]) {
            listeners[path].forEach(function(callback) {
                callback(value);
            });
        }

        return true;
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
};

/**
 * Private symbol used in storage instances to avoid naming collisions
 */
pb.Storage.symbol = Symbol('hidden storage');
