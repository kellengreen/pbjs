import symbol from './symbol.js';

/**
 * 
 */
class Element extends HTMLElement {
    /**
     *
     */
    constructor() {
        super();

        // Use symbol as to not muddy the HTMLElement namespace.
        this[symbol] = {};
    }

    /**
     * 
     */
    get manager() { return }

    /**
     * @returns {undefined}
     */
    connectedCallback() {

        this[symbol].manager = new this.Manager(elem);
    }

    /**
     * @returns {undefined}
     */
    disconnectedCallback() {
        const Manager = this.constructor[symbol].managers.get(this.tagName);

        if (Manager !== undefined) {
            const ghostElement = new GhostElement(this);
            new Manager(ghostElement);
        }
    }
}

export default Element;
