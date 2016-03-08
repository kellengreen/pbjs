'use strict';
(function() {

    /**
     * Symbols
     */

    const listeners = Symbol('listeners');

    /**
     * PbProxy
     */

    class PbObj {

        static proxy(obj) {
            /**
             *
             */
            Object.defineProperty(obj, listeners, {
                value: {}
            });

            let handler = {
                set: PbObj.set
            };

            return new Proxy(obj, handler);
        }

        static addListener(obj, key, callback) {
            /**
             *
             */
            let symbol = Symbol('listener');

            if (obj[listeners][key] === undefined) {
                obj[listeners][key] = {};
            }

            obj[listeners][key][symbol] = callback;
            return symbol;
        }

        static removeListener(obj, key, symbol) {
            /**
             *
             */
            if (obj[listeners][key] !== undefined) {
                delete obj[listeners][key][symbol];
            }
        }

        static set(obj, key, val) {
            /**
             *
             */

            // convert to proxy if necessary
            if (typeof val === 'object') {
                val = PbObj.proxy(val);
            }

            // call listeners
            if (obj[listeners][key]) {
                for (let symbol of Object.getOwnPropertySymbols(obj[listeners][key])) {
                    obj[listeners][key][symbol](val);
                }
            }

            return obj[key] = val;
        }

        static getByPath(path) {
            /**
             *
             */
            const keys = path.split('.');
            let val = pb;
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                val = val[key];
                if (typeof val !== 'object' && i !== keys.length - 1) {
                    return;
                }
            }
            return val;
        }
    }

    /**
     * PbElement
     */

    class PbElement extends HTMLElement {

        static init(tagName) {
            /**
             *
             */
            this.Element = document.registerElement(tagName, {
                prototype: this.prototype
            });
        }

        createdCallback() {
            /**
             *
             */
        }

        attchedCallback() {
            /**
             *
             */
        }

        detachedCallback() {
            /**
             *
             */
        }

        attributeChangedCallback(attrName, oldVal, newVal) {
            /**
             *
             */
            let fn = attrName + 'Changed';
            if (typeof this[fn] === 'function') {
                this[fn](newVal);
            }
        }
    }

    /**
     * PbBindElement
     */

    class PbBindElement extends PbElement {
        /**
         *
         */
        createdCallback() {
            /**
             *
             */
            console.log('created');
            this.idChanged(this.getAttribute('pb-id'));
        }

        detachedCallback() {
            /**
             *
             */
            this.value[PbObj.removeListener](this.listener);

        }

        idChanged(value) {
            /**
             *
             */
            //this.value = PbObj.getByPath(value);
            //const fn = this.idChanged.bind(this);
            //this.listener = this.value[PbObj.addListener](fn);
            //this.textContent = this.value;
        }
    }
    PbBindElement.init('pb-bind');

    /**
     * Globals
     */

    window.Pb = {
        addListener: PbObj.addListener,
        removeListener: PbObj.removeListener
    };

    window.pb = PbObj.proxy({});

})();
