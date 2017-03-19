(pb => {
    class PbElement extends HTMLElement {
        /**
         *
         */
        constructor() {
            super();
            this.attrs = new Map();
        }

        /**
         *
         */
        connectedCallback() {
            // call attribute listeners
            for (const [attr, callback] of this.attrs) {
                if (this.hasAttribute(attr)) {
                    const val = this.getAttribute(attr);
                    callback(attr, val);
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
            this.styleSheetIndexes = {};
            this.breakpoints = new Map([
                ['sm',       '(max-width: 48rem)'],
                ['md-down',  '(max-width: 62rem)'],
                ['md',       '(min-width: 48rem) and (max-width: 62rem)'],
                ['md-up',    '(min-width: 48rem)'],
                ['lg-down',  '(max-width: 75rem)'],
                ['lg',       '(min-width: 62rem) and (max-width: 75rem)'],
                ['lg-up',    '(min-width: 62rem)'],
                ['xl',       '(min-width: 75rem)'],
            ]);

            // set layout callbacks
            const layoutCallback = this.setLayoutStyle.bind(this);
            this.attrs.set('layout', layoutCallback);
            for (const breakpoint of this.breakpoints.keys()) {
                this.attrs.set(`layout@${breakpoint}`, layoutCallback);
            };
            
            // set default styling
            this.style.display = 'grid';
            
        }

        /**
         *
         */
        static get styleSheet() {
            if (this.styleElem === undefined) {
                this.styleElem = document.createElement('style');
                document.head.appendChild(this.styleElem);
            }
            return this.styleElem;
        }

        /**
         * @param {string} layout
         * @param {string} breaklayout
         */
        setLayoutStyle(key, val) {
            const re = new RegExp(/\s*(\d+)\(([^\)]*)\)\s*/g);
            let match;
            while ((match = re.exec(val)) !== null) {
                console.log(`${match[1]}: "${match[2]}"`);
            }
        }
    }

    customElements.define('pb-container', pb.Container);

})(pb=window.pb||{});
