(pb => {
    class PbElement extends HTMLElement {
        /**
         *
         */
        constructor() {
            super();
            this.attrs = new Map();
        }

        static get foo() {
            return 'FOO';
        }

        /**
         *
         */
        connectedCallback() {
            // call attribute listeners
            for (const [attrName, callback] of this.attrs) {
                if (this.hasAttribute(attrName)) {
                    const attrVal = this.getAttribute(attrName);
                    callback(attrName, attrVal);
                }
            }
        }

        /**
         * 
         * @param {string} attrName
         * @param {string} oldVal
         * @param {string} newVal
         */
        attributeChangedCallback(attrName, oldVal, newVal) {
            if (this.attrs.has(attrName)) {
                const callback = this.attrs.get(attrName);
                // We swap newVal and oldVal on purpose.
                callback(attrName, newVal, oldVal);
            }
        }
    }

    pb.Container = class PbContainer extends PbElement {
        /**
         *
         */
        constructor() {
            super();
            window.foo=this;
            this.uniqueClass = `.pb\\.container\\:${this.generateClass()}`;
            
            this.styleSheetIndexes = {};

            this.layouts = new Map();

            // set layout callbacks
            const layoutCallback = this.setLayoutStyle.bind(this);
            this.attrs.set('layout', layoutCallback);
            for (const breakpoint of this.constructor.breakpoints.keys()) {
                this.attrs.set(`layout@${breakpoint}`, layoutCallback);
            };
            
            //
            // PbContainer.styleSheet.insertRule(`${this.uniqueClass} {
                
            // }`, 0);
            
        }
        
        /**
         * 
         */
        static get breakpoints() {
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

        /**
         *
         */
        static get styleSheet() {
            if (this.styleElem === undefined) {
                this.styleElem = document.createElement('style');
                document.head.appendChild(this.styleElem);

                // Add default styles
                this.styleSheet.insertRule(`pb-container {
                    display: grid;
                }`, 0);
            }

            return this.styleElem.sheet;
        }

        generateClass() {
            let uid = '';
            for (let i = 0; i < 4; i++) {
                uid += Math.floor(Math.random() * 256).toString(16);
            }
            return `.pb\\.container\\:${uid}`;
        }

        /**
         * @param {string} layout
         * @param {string} breaklayout
         */
        setLayoutStyle(attrName, attrVal) {
            let match;
            let breakpoint;

            // match = attrName.match(/@(.+)/);
            // if (match) {
            //     breakpoint = match[1];
            //     if (this.breakpoints.get())
            // }

            const re = new RegExp(/\s*(\d+)\(([^\)]*)\)\s*/g);
            while ((match = re.exec(attrVal)) !== null) {
                const child = match[1];
                const width = match[2] || '1fr';
                // this.
                // // if (this.layouts.has())
                // // this.
                console.log(`${child}: "${width}"`);
            }
        }
    }

    customElements.define('pb-container', pb.Container);

})(pb=window.pb||{});
