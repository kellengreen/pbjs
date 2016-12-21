const pb = {
    symbol: Symbol('pb'),
};
/**
 * domManager
 */
pb.domManager = new class DomManager {
    /**
     * DomManager
     */
    constructor() {
        /**
         *
         */
        this.registrations = new Map();
        this.startObservations();
    }

    ready() {
        var w = window,
            d = document,
            s = {};

        s.ready = function(callback) {
            if (document.readyState === 'loading') {
                var event = 'readystatechange';
                document.addEventListener(event, function listener() {
                    document.removeEventListener(event, listener);
                        callback();
                });
            } else {
                callback();
            }
        }

        w.shortcuts = s;
    }

    startObservations() {
        /**
         * 
         */
        const options = {
            childList: true,
            subtree: true,
            attributes: true,
        };
        const callback = this.parseMutations.bind(this);
        this.observer = new MutationObserver(callback);
        // this.observer.observe(document.body, options);
    }
    
    parseMutations(mutations) {
        /**
         *
         */
        mutations.forEach((mutation) => {
            console.dir(mutation);
            // if (mutation.type === 'attributes') {
            //     const elem = mutation.target;
            //     const name = mutation.attributeName;
            //     const value = elem.getAttribute(name);
            //     this.attrChanged(elem, name, value);
            // } else if (mutation.type === 'childList') {
            //     this.loopPbElems(mutation.addedNodes, this.pbElemAdded);
            //     this.loopPbElems(mutation.removedNodes, this.pbElemRemoved);
            // }
        });
    }

    upgradeElement(elem) {
        /**
         * Upgrade element to  
         */
    }

    downgradeElement(elem) {
        /**
         * 
         */
    }

    loopPbElems(nodeList, callback) {
        /**
         * Loop pbElements
         */
        for (let i = 0, elem; elem = nodeList[i]; i++) {
            if (elem instanceof HTMLElement && elem.getAttribute('pb-is')) {
                callback(elem);
            }
        }
    }

    attrChanged(elem, name, value) {
        /**
         * Call elemManager method on attribute change.
         */
        const elemManager = elem[pb.symbol];
        if (elemManager) {
            const methodName = `${this.toCamelCase(name)}Changed`;
            if (typeof elemManager[methodName] === 'function') {
                elemManager[methodName](value);
            }
        }
    }

    toCamelCase(attrName) {
        /**
         * Converts "foo-bar" to "fooBar".
         */
        return name.replace(/-(.)/g, (m, p) => { 
            return p.toUpperCase();
        });
    }

    pbElemAdded(elem) {
        /**
         *
         */
        console.log('Added');
        console.dir(elem);
    }

    pbElemRemoved(elem) {
        /**
         *
         */
        console.log('Removed');
        console.dir(elem);
    }

    register(name, ElemManager) {
        /**
         *
         */
        this.registrations.set(name, PbElement);

        // find existing elements
        for (const elem of document.querySelectorAll(`template[pb='${name}']`)) {
            this.upgradeElement(elem);
        }
    }
};

/**
 * shortcuts
 */

pb.register = pb.domManager.register;

/**
 * ElementManager
 */
pb.ElementManager = class BaseManager {
    /**
     * ElementManager
     */
    constructor(template) {
        /**
         * @param template
         */
        this.template = template;
        this.template[pb.symbol] = this;
    }

    deconstructor() {
        /**
         *
         */
    }

    attached() {
        /**
         * Callback for when element is attached to the DOM.
         */
        console.log(`attached: ${this.element}`);
    }

    detached() {
        /**
         * Callback for when element is detached from the DOM.
         */
        console.log(`detached: ${this.element}`);
    }

    attrChanged(key, value) {
        /**
         * Callback for when element is detached from the DOM. 
         */
        console.log(`attrChanged: ${this.element}`);
    }

    pbIsChanged(value) {
        /**
         *
         */
    }
};

