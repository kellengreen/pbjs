import symbol from './symbol.js';

/**
 * 
 */
class ProxyHandlers {
    /**
     * 
     */
    static set(target, property, value) {

        console.log(`set "${property}" to "${value}"`);
        if (property === 'length' && Array.isArray(target) === true) {

        } else {

        }
        target[property] = value;
        return true;
    }
}


/**
 * 
 */
class Pb {
    /**
     * 
     */
    constructor(root) {
        this.root = this.asProxy(root);
    }

    /**
     * @param {(string|object)} reference
     * @param {function} callback
     * @returns {undefined}
     */
    static listen(reference, callback) {
        let object;
        if (typeof reference === 'string') {

        } else {
            object = reference;
        }
        
        const props = this.getPropsFromPath(path);
        const prop = props.pop();
        const object = this.getObjFromProps(prop);
        const listeners = object[symbol];
        
        // Add the new callback.
        let callbacks = listeners.get(prop);
        if (callbacks === undefined) {
            callbacks = new Set();
            listeners.set(prop, callback);
        }
        callbacks.add(callback);
    }
        
    /**
     * @param {string} path
     * @param {function} callback
     * @returns {undefined}
     */
    ignore(path, callback) {
        if (object[property] === undefined || object[property][symbol] === undefined) {
            return;
        }
    }

    /**
     * Returns a value from a given string path.
     * @param {string} path
     * @returns {*}
     */
    getObjFromProps(props) {
        let object = this.root;

        for (const prop of props) {
            
            // Don't allow wildcard searches.
            if (prop === '*') {
                throw new Error(`"${path}" cannot get object with a wildcard path.`);
            }
            
            value = value[prop];

            // Transform to proxy object if undefined.
            if (value === undefined) {
                value = this.asProxy();
            }

            // If primitive value throw an error.
            if (this.isPrimitive(value) === true) {
                throw new Error(`"${prop}" was primitive enroute to "${path}".`);
            }
        }

        return object;
    }

    /**
     * 
     * @param {*} path 
     */
    getPropsFromPath(path) {
        const props = path.split('.');

        // Check for empty strings within the path string.
        if (props.every(prop => { prop !== '' }) === true) {
            throw new Error(`"${path}" is an invalid path.`);
        }

        return props;
    } 

    /**
     * Primitive types: number, string, boolean, undefined, null, and symbol.
     * @param {*} value
     * @returns {boolean}
     */
    isPrimitive(value) {
        return value === null || typeof value !== 'object';
    }

    /**
     * @param {target}
     * @returns {proxy}
     */
    asProxy(target = {}) {
        target[symbol] = new Map();
        return new Proxy(target, ProxyHandlers);
    }
}

export default Pb;
