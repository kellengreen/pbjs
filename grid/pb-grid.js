(pb => {
    class CssBuilder {
        /**
         * Transforms an object into a css string.
         * @param {object} selectors
         */
        static create(selectors) {
            let css = '';
            for (const [selector, properties] of Object.entries(selectors)) {
                css += `${selector} {`;
                for (const [property, value] of Object.entries(properties)) {
                    css += `${property}:${value};`
                }
                css += `}`;
            }
            return css;
        }

        /**
         * Tranforms an object in a media query css string.
         * @param {object} queries
         */
        static createMedia(queries) {
            let css = ``;
            for (const [query, selectors] of Object.entries(object)) {
                css += `@media ${query} {
                    ${this.create(selectors)}
                }`;
            }
            return css;
        }

        /**
         * Tranforms an object in a media query css string.
         * @param {object} queries
         */
        static createKeyframes(queries) {
            let css = ``;
            for (const [animation, selectors] of Object.entries(object)) {
                css += `@keyframes ${animation} {
                    ${this.create(selectors)}
                }`;
            }
            return css;
        }
    }

    class CSSStyleSheet {
        /**
         * 
         * @param {CSSStyleSheet} cssStyleSheet 
         */
        static appendRule(cssStyleSheet, rule) {
            return cssStyleSheet.insertRule(rule, cssStyleSheet.cssRules.length);
        }

        /**
         * 
         * @param {CSSStyleSheet} cssStyleSheet 
         */
        static deleteRules(cssStyleSheet) {
            for (let i = 0; i < cssStyleSheet.cssRules.length; i++) {
                this.styleElem.sheet.deleteRule(i);
            }
        }
    }

    class PbGrid extends HTMLElement {
        /**
         *
         */
        constructor() {
            super();
            this.id = this.generateId();
            this.styleElem = undefined;
            
            // DEBUG
            window.foo = this;
        }

        // STATIC PROPERTIES

        static get tagName() {
            return 'pb-grid';
        }
        
        // CLASS PROPERTIES

        get attrPrefix() {
            return 'cols';
        }

        /**
         * 1:50%
         * 1=50%
         * 1(50%)
         * 
         */
        get colsRegex() {
            return /\s*(\d+):([^\)]*)/g;
        }

        get breakpoints() {
            return new Map([
                ['sm',       '(max-width: 48rem)'],
                ['md-down',  '(max-width: 62rem)'],
                ['md',       '(min-width: 48rem) and (max-width: 62rem)'],
                ['md-up',    '(min-width: 48rem)'],
                ['lg-down',  '(max-width: 75rem)'],
                ['lg',       '(min-width: 62rem) and (max-width: 75rem)'],
                ['lg-up',    '(min-width: 62rem)'],
                ['xl',       '(min-width: 75rem)'],
            ]);
        }

        // CLASS METHODS

        /**
         * 
         */
        connectedCallback() {
            // set element id
            this.buildStyleSheet();
        }

        /**
         * 
         */
        disconnectedCallback() {

            // remove stylesheet
            document.head.removeChild(this.styleElem);
            this.styleElem = undefined;
        }

        /**
         * 
         */
        attributeChangedCallback(attrName, oldVal, newVal) {
            if (attrName.startsWith(this.attrPrefix)) {
                this.buildStyleSheet
            }
        }

        /**
         * Generates a pseudo random 4 byte hex string. 
         */
        generateId() {
            let uid = '_';
            for (let i = 0; i < 4; i++) {
                uid += Math.floor(Math.random() * 256).toString(16);
            }
            return uid;
        }

        /**
         * 
         */
        buildStyleSheet(query, value) {

            if (this.styleElem) {
                // clear old rules
                for (let i = 0; i < this.styleElem.sheet.cssRules.length; i++) {
                    this.styleElem.sheet.deleteRule(i);
                }
            } else {
                // create new <style> element within <head>
                this.styleElem = document.createElement('style');
                this.styleElem.setAttribute('for', this.id);
                document.head.appendChild(this.styleElem);
           }


            let attrVal = this.getAttribute('layout');
            let [colStarts, templateCols] = this.parseLayout(attrVal);

            this.appendRule(`
                #${this.id} {
                    display: grid;
                    grid-template-columns: ${templateCols.join(' ')};
                }
            `);

            for (let i = 1; i <= this.childElementCount; i++) {
                const selector = `${containerSelector} > *:nth-child(${i})`;
                const colStart = colStarts[i];
                let rules;
                if (colStart) {
                    rules = `
                        display: initial;
                        grid-column-start: ${colStart};
                        grid-row-start: 1;
                    `;
                } else {
                    rules = `
                        display: none;
                    `;
                }
                this.appendRule(`
                    ${selector} {
                        ${rules}
                    }
                `);
            }

            for (const [breakpoint, query] of this.breakpoints) {

                const attrVal = this.getAttribute(`layout@${breakpoint}`);
                if (attrVal) {
                    let [colStarts, templateCols] = this.parseLayout(attrVal);

                    this.appendRule(`
                        @media ${query} {
                            ${containerSelector} {
                                grid-template-columns: ${templateCols.join(' ')};
                            }
                        }
                    `);

                    for (let i = 1; i <= this.childElementCount; i++) {
                        const colStart = colStarts[i];
                        let rules;
                        if (colStart) {
                            rules = `
                                display: initial;
                                grid-column-start: ${colStart};
                                grid-row-start: 1;
                            `;
                        } else {
                            rules = `
                                display: none;
                            `;
                        }
                        this.appendRule(`
                            @media ${query} {
                                ${containerSelector} > *:nth-child(${i}) {
                                    ${rules}
                                }
                            }
                        `);
                    }
                }
            }
        }

        parseLayout(attrVal) {
            const colStarts = [];
            const templateCols = [];

            const re = new RegExp(/\s*(\d+)\(([^\)]*)\)\s*/g);
            let order = 1;
            let match;
            while ((match = re.exec(attrVal)) !== null) {
                const child = match[1];
                const width = match[2];
                colStarts[child] = order;
                templateCols.push(width);
                order++;
            }
            return [colStarts, templateCols];
        }
    }

    customElements.define(PbGrid.tagName, PbGrid);
    pb.Container = PbContainer;

})(pb=window.pb||{});
