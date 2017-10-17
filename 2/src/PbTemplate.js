import PbBase from './PbBase.js';

class PbTemplate extends PbBase {
    /**
     * Simple class to check for <template> tag
     */
    constructor() {
        super();
        this._template = null;
    }

    /**
     * 
     */
    connectedCallback() {
        super();

        // require <template> element
        const element = this.firstElementChild();
        if ((element instanceof HTMLTemplateElement) === false) {
            throw new Error(`<template> was not found in ${this.tagName}`);
        }
        this._template = element.cloneNode(true);
    }

    /**
     * Tagged template literal to clean HTML
     * clean`<p>${input}</p>`
     * @param {array} strings 
     * @param {...string} values 
     */
    _sanitize() {
        const elem = document.createElement('p');
        let result = '';
        for (let i = 0; i < values.length; i++) {
            elem.textContent = values[i];
            result += strings[i] + elem.innerHTML;
        }
        result += strings[strings.length - 1];
        return result;
    }
}

export default PbTemplate;