/**
 * ElementManager
 */
pb.ElementManager = class ElementManager {
    /**
     * ElementManager
     */
    constructor(element) {
        /**
         *
         */
        this.element = element;
        this.element[pb.symbol] = this;
    }

    attached() {
        /**
         * Callback for when element is attached to the DOM.
         */
        console.log(`attached: ${this.element}`);
    }

    detached() {
        /**
         * Callback for when element is detached from the DOM.
         */
        console.log(`detached: ${this.element}`);
    }

    attrChanged(key, value) {
        /**
         * Callback for when element is detached from the DOM. 
         */
        console.log(`attrChanged: ${this.element}`);
    }

    pbIsChanged(value) {
        /**
         * 
         */
    }
};
