import ModEvent from './ModEvent.js';


class PbSet extends Set {
    /**
     * 
     */
    constructor(iterable) {
        super(iterable);
        this.callbacks = new Set();
    }
    
    /**
     * 
     */
    add(value) {
        for (const callback of this.callbacks) {
            const evt = new ModEvent();
            evt.add
            callback(evt);
        }
        return super.add(value);
    }

    /**
     * 
     * @returns {undefined}
     */
    listen(callback) {
        this.callbacks.add(callback);
    }

    /**
     * @returns {undefined}
     */
    ignore(callback) {
        this.callbacks.delete(callback);
    }
}

export default PbSet;