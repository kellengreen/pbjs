// import Attrs from '../pb-attrs/class.js';


class PbRepeat extends HTMLElement {
    constructor() {
        super();
        
        // get template 
        const template = document.querySelector('template');
        if (template === null) {
            throw new Error(`<template> was not found in ${this.tagName}`);
        }
        this.template = template.innerHTML;
        // this.template = this.innerHTML;

        this.renderFn = null;

        // call attribute
        this.attributeChangedCallback('pb-for', undefined, this.getAttribute('pb-for'));
    }

    connectedCallback() {
        
    }

    disconnectedCallback() {

    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case 'pb-for':
                if (newVal === null) {
                    throw new Error('pb-for attribute is required for pb-repeat element');
                }
                this.renderFn = this.createRenderFn(newVal);
                this.render();
                break;
        }
    }

    render() {
        this.innerHTML = this.renderFn.call(window);
    }

    /**
     * 
     */
    createRenderFn(expression) {
        return new Function(`
            'use strict';
            let html = '';
            for (${expression}) {
                html += \`${this.template}\`;
            } 
            return html;
        `);
    }
}

export default PbRepeat;
