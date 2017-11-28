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
        console.log('constructor');
    }

    /**
     * @returns {undefined}
     */
    connectedCallback() {
        console.log('connected');
        // this.parentElement.removeChild(this);
    }

    /**
     * @returns {undefined}
     */
    disconnectedCallback() {
        console.log('disconnected');
    }

    /**
     * 
     * @param {string} attrName
     * @param {string} oldVal
     * @param {string} newVal
     * @returns {undefined}
     */
    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log('attributeChanged');
    }
    
    /**
     * @returns {undefined}
     */
    adoptedCallback() {
        console.log('adopted');
    }
}

export default Element;
