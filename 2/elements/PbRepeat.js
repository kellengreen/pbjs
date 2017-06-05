import PbTemplatable from './PbTemplatable.js';


class PbRepeat extends PbTemplatable {
    constructor() {
        super();

        this.$renderFn = null;
        this.$attributes.add('pb-for');
    }

    $onPbForAttrChanged(newVal, oldVal) {
        newVal = newVal === null || newVal === '' ? 'const {} of [])' : newVal;
        this.$setRenderFn(newVal);
        this.$render();
    }

    $render() {
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
