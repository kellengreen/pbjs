const pb = {
    symbol: Symbol('pb'),
};

/**
 * domController
 */

pb.domController = new class DomController {

    constructor() {
        /**
         *
         */
        this.registrations = new Map();

    
        this.domReadyCompleted = false;
        this.domReadyListener();
    }

    domReadyListener() {
        /**
         * Calls domReadyCallback when the DOM is interactive
         */
        if (document.readyState === 'loading') {
            const event = 'readystatechange';
            const callback = () => {
                document.removeEventListener(event, callback);         
                this.domReadyCallback();
            }
            document.addEventListener(event, callback); 
        } else {
            this.domReadyCallback();
        }
    }

    domReadyCallback() {
        /**
         * Callback for when DOM is interactive
         */
        console.log(document.readyState);
        // for (const key, val of this.registrations.entries()) {
        //     console.log(key);
        //     console.log(val);
        // }
        // this.startObservations();

        this.domReadyCompleted = true;
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
        this.observer.observe(document.body, options);
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

pb.register = pb.domController.register;

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

