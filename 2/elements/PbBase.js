class PbBase extends HTMLElement {
    /**
     * 
     */
    constructor() {
        super();
        this.$attributes = new Set();
    }

    connectedCallback() 
    {
        // run attribute
        for (const attribute of this.$attributes) {
            this.attributeChangedCallback(attribute, undefined, this.getAttribute(attribute));
        }
    }

    /**
     * 
     * @param {string} attrName 
     * @param {string} oldVal 
     * @param {string} newVal 
     */
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (this.$attributes.has(attrName)) {
            const callbackName = `$on${attrName.replace(/^.|-./g, (match, p1) => {
                debugger;
                return match.toUpperCase();
            })}AttrChanged`;
            
            //
            if (typeof this[callbackName] === 'function') {
                this[callbackName](newVal, oldVal);
            }
        }
    }
}

export default PbBase;