/**
 * Base Controller
 */

pb.Base = class Base {

    constructor(template) {
        /**
         * @param template
         */
        this.template = template;
        this.template[pb.symbol] = this;
        this.children = [];
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

pb.register('base', pb.Base);