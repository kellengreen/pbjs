/**
 * ElementManager
 */
pb.ElementManager = class BaseManager {
    /**
     * ElementManager
     */
    constructor(template) {
        /**
         * @param template
         */
        this.template = template;
        this.template[pb.symbol] = this;
    }

    deconstructor() {
        /**
         *
         */
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
