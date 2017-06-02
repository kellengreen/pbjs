import PbTemplatable from './PbTemplatable.js';


class PbRender extends PbTemplatable {
    constructor() {
        super();
        this.$renderFn = null;
        
        // call attribute
        this.attributeChangedCallback('pb-for', undefined, this.getAttribute('pb-for'));
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case 'pb-for':
                if (newVal === null) {
                    throw new Error('pb-for attribute is required for pb-repeat element');
                }
                this.$setRenderFn()
                this.$render();
                break;
        }
    }

    $render() {
        this.innerHTML = this.renderFn.call(window);
    }

    /**
     * 
     */
    $setRenderFn(expression) {
        this.$renderFn = new Function(`
            'use strict';
            ${expression};
            return \`${this.$template.innerHTML}\`;
        `);
    }
}

export default PbRepeat;
