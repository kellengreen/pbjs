
/**
 * domController
 */

pb.dom = new class Dom {

    constructor() {
        /**
         *
         */
        this.controllers = new Map();
        this.domIsReady = false;
        this.domReadyListener();
    }

    domReadyListener() {
        /**
         * Calls callback when the DOM is interactive
         */
        if (document.readyState === 'loading') {
            const event = 'readystatechange';
            const callback = () => {
                document.removeEventListener(event, callback);
                this.domReadyCallback();
                this.domIsReady = true;
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
        for (const [name, Controller] of this.controllers.entries()) {
            this.upgradeElements(name, Controller);
        }
        // this.startObservations();
    }

    upgradeElements(name, Controller) {
        /**
         * Upgrades new template elements
         */
        const elems = document.querySelectorAll(`template[pb='${name}']`);
        for (const elem of elems) {
            if (elem[pb.symbol] === undefined) {
                elem[pb.symbol] = new Controller(elem);
            }
        }
    }

    downgradeTemplate(elem) {
        /**
         * 
         */
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

    register(name, Controller) {
        /**
         * @param name
         * @param Controller
         */
        this.controllers.set(name, Controller);
        if (this.domIsReady) {
            this.upgradeElements(name, Controller);
        }
    }
};

pb.register = pb.dom.register.bind(pb.dom);
