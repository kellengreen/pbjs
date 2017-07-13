import pb from './pb.js';
import PbTemplate from './PbTemplate.js';

/**
 * 
 */
class PbRepeat extends PbTemplate {
    /**
     * 
     */
    constructor() {
        // super();
        this._renderFn = null;
    }

    /**
     * 
     */
    connectedCallback() {
        // super();
        this._render();
    }

    /**
     * 
     * @param {string} attrName
     * @param {string} oldVal
     * @param {string} newVal
     */
    attributeChangedCallback(attrName, oldVal, newVal) {
        const attrs = new attrs(['pb-key', 'pb-val', 'pb-iter']);
        if (attrs.has(attrName)) {
            this.render();
        }
    }

    _render() {
        this.innerHTML = this.$renderFn.call(window);
    }

    /**
     * 
     */
    $setRenderFn(expression) {
        this.$renderFn = new Function(`
            'use strict';
            let $$ = '';
            for (const [${vars}] of ${iter}.entries()) {
                $$ += \`${this.$template.innerHTML}\`;
            } 
            return $;
        `);
    }
}

export default PbRepeat;
