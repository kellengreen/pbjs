const listenerSym = Symbol('listeners');

/**
 * 
 */
class ProxyHandlers {
    /**
     * 
     * @param {object} target 
     * @param {string} property 
     * @param {*} value 
     */
    static set(target, property, value) {
        console.log(`set "${property.toString()}" to "${value}"`);
        target[property] = value;

        // Call event listeners.
        const callbackSet = target[listenerSym].get(property);
        if (callbackSet !== undefined) {
            for (const callbackFn of callbackSet) {
                callbackFn(value);
            }
        }

        return true;
    }
}

class Storage {
    /**
     * 
     * @param {object} object 
     * @returns {proxy}
     */
    static create(object = {}) {
        object[listenerSym] = new Map();
        return new Proxy(object, ProxyHandlers);
    }

    /**
     * 
     * @param {string} property
     * @param {function} callbackFn
     * @returns {undefined}
     */
    static listen(object, property, callbackFn) {
        const listenerMap = object[listenerSym];
        let callbackSet = listenerMap.get(property);

        // Create new set set if necessary.
        if (callbackSet === undefined) {
            callbackSet = new Set();
            listenerMap.set(property, callbackSet);
        }

        callbackSet.add(callbackFn);
    }

    /**
     * 
     * @param {object} object
     * @param {string} property 
     * @param {function} callback 
     */
    static ignore(object, property, callbackFn) {
        const callbackSet = object[listenerSym].get(property);
        if (callbackSet !== undefined) {
            callbackSet.delete(callbackFn);
        }
    }
}

export default Storage;