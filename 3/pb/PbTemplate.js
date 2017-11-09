import PbElem from './PbElem.js';
import PbCustomElement from './PbCustomElement.js';

class PbTemplate extends PbElem {
    /**
     *
     */
    constructor() {
        super();
        this._renderFn;
    }

    /**
     * @returns {undefined}
     */
    connectedCallback() {
        super.connectedCallback();
        
        // Get template string.
        const elem = this.firstElementChild;
        let template;
        if (elem instanceof HTMLTemplateElement) {
            template = elem.innerHTML;
            this.removeChild(elem);
        } else {
            template = this.innerHTML;
        }
        window._=this;
        console.log(template);
        this._renderFn = this._createRenderFn(template);
        this.innerHTML = this._renderFn();
    }

    /**
     * @returns {undefined}
     */
    disconnectedCallback() {
        super.disconnectedCallback();
    }

    /**
     * 
     * @param {string} template
     * @returns {function}
     */
    _createRenderFn(template) {
        return new Function(`
            return this._sanitize\`${template}\`;
        `);
    }

    /**
     * Tagged template literal to clean HTML
     * clean`<p>${input}</p>`
     * @param {array} strings
     * @param {...string} values
     */
    _sanitize(strings, ...values) {
        // console.dir(strings);
        // console.dir(values);
        // debugger;
        const elem = this.constructor._renderElem;
        let result = strings[0];
        for (let i = 0; i < values.length; i++) {
            elem.textContent = values[i];
            result += elem.innerHTML + strings[i + 1];
        }
        elem.innerHTML = '';
        return result;
    }
}

Pb

PbTemplate._renderElem = document.createElement('p');

customElements.define('pb-template', PbTemplate);

export default PbTemplate;
