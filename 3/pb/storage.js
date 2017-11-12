import symbol from './symbol.js';

/**
 * 
 */
class Storage {
    /**
     * @param {object}
     * @returns {proxy}
     */
    static object(object) {
        object[symbol] = {};
        return new Proxy(object, {
            set: this.setHandler.bind(this),
            deleteProperty: this.deleteHandler.bind(this),
        });
    }

    /**
     * @param {proxy} proxy
     * @param {string} property 
     * @param {function} callback 
     * @returns {undefined}
     */
    static listen(proxy, property, callback) {
        let set = proxy[symbol][property];
        if (set === undefined) {
            set = new Set();
            proxy[symbol][property] = set;
        }
        set.add(callback);
    }
    
    /**
     * @param {proxy} object
     * @param {string} property 
     * @param {function} callback 
     * @returns {undefined}
     */
    static ignore(proxy, property, callback) {
        let set = proxy[symbol][property];
        if (set !== undefined) {
            set.delete(callback);
        }
    }
    
    /**
     * Handler for set requests.
     * @param {*} target - The object we're looking to modify.
     * @param {string} property - Name of the property to be set.
     * @param {*} value - Value to be set in the object.
     * @param {*} receiver - The proxy object.
     * @returns {boolean} - 
     */
    static setHandler(target, property, value, receiver) {
        console.dir(this);
        // Create a new proxy if value is not a primitive.
        if (value instanceof Object) {
            value  = this.object(value);
        }
        target[property] = value;
        this.invokeCallbacks(target, property);
        return true;
    }
    
    
    /**
     * Handler for set requests.
     * @param {*} target - The object we're looking to modify.
     * @param {string} property - Name of the property to be set.
     * @returns {boolean} - 
     */
    static deleteHandler(target, property) {
        delete target[property];
        this.invokeCallbacks(target, property);
        return true;
    }

    /**
     * 
     * @param {object} target 
     * @param {string} property 
     * @returns {undefined}
     */
    static invokeCallbacks(target, property) {
        const value = target[property];
        const callbacks = target[symbol][property];
        if (callbacks !== undefined) {
            for (const callback of callbacks.values()) {
                callback(value);
            }
        }
    }
}

export default Storage;
