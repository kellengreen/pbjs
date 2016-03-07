'use strict';
const pb = (function() {

    /**
     * Symbols
     */

    const symbols = {
        'listeners': Symbol('listeners'),
        'addListener': Symbol('addListener'),
        'removeListener': Symbol('removeListener')


    };

    /**
     * PbProxy
     */

    class PbObj {

        static init(obj) {
            /**
             *
             */
            let handler = {
                set: PbObj.set
            };

            Object.listeners(obj, symbols.listeners, {
                value: {}
            });

            Object.defineProperty(obj, symbols.addListener, {
                value: function(key, callback) {
                    let symbol = Symbol('listener');

                    if (this[symbols.listeners][key] === undefined) {
                        this[symbols.listeners][key] = {};
                    }

                    this[symbols.listeners][key][symbol] = callback;
                    return Symbol();
                }
            });


            Object.defineProperty(obj, symbols.removeListener, {
                value: function(key, symbol) {
                    try {
                        return delete this[symbols.listeners][key][symbol];
                    } catch(e) {
                        return false;
                    }
                }
            });

            return new Proxy(obj, handler);
        }

        static set(obj, key, val) {
            /**
             *
             */
            if (typeof val === 'object') {
                val = PbObj.init(val);
            }
            return obj[key] = val;
        }

        static getByPath(path) {
            const keys = path.split('.');
            let val = pb.root;
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
            this.idChanged(this.getAttribute('pb-id'));
        }

        idChanged(value) {
            let obj = PbObj.getByPath(value);
            this.textContent = PbObj.getByPath(value);
        }
    }

    /**
     * pb
     */

    return {
        symbols: symbols,
        BindElement: PbBindElement,
        root:  PbObj.init({})
    };

})();

//=include storage/map.js
//=include storage/set.js
//=include elements/base.js
//=include elements/provider.js
//=include elements/bind.js
