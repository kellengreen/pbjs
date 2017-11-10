class ModEvent {
    /**
     * 
     */
    constructor() {
        this.added = null;
        this.edited = null;
        this.removed = null;
    }

    /**
     * 
     * @param {*} key 
     * @param {*} val 
     */
    addToAdded(key, val) {
        if (this.added === null) {
            this.added = [];
        }
        this.added.push([key, val]);
    }

    /**
     * 
     * @param {*} key 
     * @param {*} val 
     */
    addToEdited(key, val) {
        if (this.edited === null) {
            this.edited = [];
        }
        this.edited.push([key, val]);
    }

    /**
     * 
     * @param {*} key 
     * @param {*} val 
     */
    addToRemoved(key, val) {
        if (this.removed === null) {
            this.removed = [];
        }
        this.removed.push([key, val]);
    }
}

export default ModEvent;