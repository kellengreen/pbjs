'use strict';
(function() {

    class PbManager {
        /**
         * PbManager
         */
        constructor() {
            /**
             *
             */
            this.drawScheduled = new Set();
            this.drawListeners = {};
            this.liveListeners = {};

            this.path = Symbol('path');
            this.obj = this.proxy({}, null);

            // now, live,
            // raf, draw, delay
        }

        proxy(obj, parent) {
            /**
             * Create a proxy
             */

            Object.defineProperty(obj, this.path, {
                value: parent ? parent[this.path] : ''
            });

            if (typeof val === 'object') {
                val = this.proxy(val);
            }

            const handler = {
                set: this.setHandler
            };

            return new Proxy(obj, handler);
        }

        setHandler(obj, key, val) {
            /**
             * Trap function for set property
             */

            //
            if (typeof val === 'object') {
                val = new String(val);
            }

            // listeners
            this.setOrExecListeners(obj, this.liveListeners);
            this.setOrExecListeners(obj, this.drawListeners);

            val = this.proxy(val);
            return obj[key] = val;
        }

        addLiveListener(path, fn) {
            if (this.liveListeners[path]) {
                this.liveListeners[path].add(fn);
            } else {
                this.liveListeners[path] = new Set([fn]);
            }
        }

        addDrawListener(path, fn) {
            if (this.drawListeners[path]) {
                this.drawListeners[path].add(fn);
            } else {
                this.drawListeners[path] = new Set([fn]);
            }
        }

        removeLiveListener(path, fn) {
            if (this.liveListeners[path]) {
                this.liveListeners[path].remove(fn);
            }
        }

        removeDrawListener(path, fn) {
            if (this.drawListeners[path]) {
                this.drawListeners[path].remove(fn);
            }
        }

        setOrExecListeners(obj, key) {
            /**
             *
             */
            if (obj[key]) {
                obj[key].forEach(function(callback) {
                    callback(obj, key);
                });
            } else {
                obj[key] = new Set();
            }
        }

        drawCallback() {
            /**
             *
             */
            this.rafScheduled = false;
            this.rafCallbacks.forEach(function(callback) {
                callback();
            }.bind(this));
        }

        getObjKeyPair(path) {
            /**
             *
             */
            const keys = path.split('.');
            let obj = this.obj;
            let key;
            for (let i = 0; i < keys.length; i++) {
                key = keys[i];
                if (typeof obj[key] !== 'object' && i !== keys.length - 1) {
                    throw `Path does not exist: ${path}`;
                }
            }
            return {obj, key};
        }
    }

    class PbElement extends HTMLElement {
    /**
     * PbManager
     */
        static register(tagName) {
            /**
             *
             */
            document.registerElement(tagName, {
                prototype: this.prototype
            });
        }

        createdCallback() {
            /**
             *
             */
            this.attrs.forEach(function(name) {
                const val = this.getAttribute(name);
                this.attributeChangedCallback(name, undefined, val);
            }.bind(this));
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
            const fnName = attrName.replace(/-([a-z])/g, function (m, p1) {
                return p1.toUpperCase();
            }) + 'Changed';

            if (this[fnName]) {
                this[fnName](newVal, oldVal);
            }
        }
    }

    /**
     * PbBindElement
     */

    class PbBindElement extends PbElement {
        createdCallback() {
            /**
             *
             */
            this.attrs = new Set(['bind-to']);
            super.createdCallback();
        }

        detachedCallback() {
            /**
             *
             */
            // this.value[pbManager.removeListener](this.listener);
        }

        bindToChanged(newVal, oldVal) {
            /**
             *
             */
            if (oldVal) {
                pbManager.removeListener(oldVal);
            }

            //this.callback = function(val) {
            //    window.requestAnimationFrame(function() {
            //        const {obj, key} = PbObj.getObjKeyPair(newVal);
            //        this.textContent = val;
            //    }.bind(this));
            //};

            this.callback = function(obj, key) {
                this.render(obj, key);
            }.bind(this);

            pbManager.addListener(newVal, this.callback);
            const {obj, key} = pbManager.getObjKeyPair(newVal);
            this.render(obj, key);
        }

        render(obj, key) {
            this.textContent = obj[key];
        }
    }

    /**
     * Globals
     */

    const pbManager = new PbManager();

    window.Pb = pbManager;
    window.pb = pbManager.obj;

    /**
     * Register
     */

    PbBindElement.register('pb-bind');

})();
