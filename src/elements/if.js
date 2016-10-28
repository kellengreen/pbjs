pb.If = class extends HTMLTemplateElement {
    /**
     * 
     */
    constructor() {
        /**
         * 
         */
        super();
        console.log('constructor');
    }

    connectedCallback() {
        /**
         * 
         */
        console.log('connected');        
    }

    disconnectedCallback() {
        /**
         * 
         */
        console.log('disconnected');        
    }
    
    attributeChangedCallback(attrName, oldVal, newVal) {
        /**
         * 
         */
        console.log('attributeChanged');          
    }

    adoptedCallback() {
        /**
         * 
         */
        console.log('attributeChanged');         
    }

}

customElements.define('pb-if', pb.If, {extends: 'template'});
