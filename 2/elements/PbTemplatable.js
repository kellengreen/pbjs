import PbBase from './PbBase.js';

class PbTemplatable extends PbBase {
    /**
     * Simple class to check for <template> tag
     */
    constructor() {
        super();

        // require <template> element
        this.$template = this.querySelector('template');
        if (this.$template === null) {
            throw new Error(`<template> was not found in ${this.tagName}`);
        }
    }

    /**
     * Tagged template literal to clean HTML
     * clean`<p>${input}</p>`
     * @param {array} strings 
     * @param {...string} values 
     */
    $sanitize() {
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

export default PbTemplatable;