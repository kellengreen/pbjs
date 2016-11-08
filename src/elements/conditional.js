/**
 * pb.Conditional
 */

pb.Conditional = class extends HTMLTemplateElement {
    /**
     * 
     */
    constructor() {
        /**
         * 
         */
        super();
    }

    connectedCallback() {
        /**
         * 
         */
    }

    disconnectedCallback() {
        /**
         * 
         */
    }
    
    attributeChangedCallback(attrName, oldVal, newVal) {
        /**
         * 
         */
    }

    _parseCondition(str) {
        /**
         * 
         */
        let leftName;
        let leftType;
        let leftVal;

        let rightName;
        let rightType;
        let rightVal;

        let opporator;

        let andOrRegex = /(&&|\|\|)/;
        let conditionalRegex = /^\w*(.+)\w*(==|===|!=|>|>=|<|<=)\w(.+)\w*$/;

    }
}

/**
 * pb.If
 */

pb.If = class extends pb.Conditional {
    /**
     * 
     */
    constructor() {
        /**
         * 
         */
        super();
    }

    connectedCallback() {
        /**
         * 
         */
    }

    disconnectedCallback() {
        /**
         * 
         */
    }
    
    attributeChangedCallback(attrName, oldVal, newVal) {
        /**
         * 
         */
    }
}

customElements.define('pb-if', pb.If, {extends: 'template'});

/**
 * pb.IfElse
 */

pb.IfElse = class extends pb.Conditional {
    /**
     * 
     */
    constructor() {
        /**
         * 
         */
        super();
    }

    connectedCallback() {
        /**
         * 
         */
    }

    disconnectedCallback() {
        /**
         * 
         */
    }
    
    attributeChangedCallback(attrName, oldVal, newVal) {
        /**
         * 
         */
    }
}

customElements.define('pb-if-else', pb.IfElse, {extends: 'template'});
