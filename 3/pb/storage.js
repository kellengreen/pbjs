const allowedObjects = [
    Array,
    Map,
    Set
]

class Storage {
    /**
     * 
     */
    static proxy(target) {
        return new Proxy(target, this)
    }

    /**
     * 
     */
    static get(target, property, receiver) {
        if (target[property] === undefined) {
            target[property] = this.proxy({});
        }
        return target[property];
    }

    /**
     * 
     */
    static set(target, property, value, receiver) {

        if (value instanceof Object) {
            value  = this.proxy(value);
        }

        return target[property] = value;
    }
}

const storage = Storage.proxy({});

export default storage;
