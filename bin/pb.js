/*
    [Properties]
        symbol
    [Functions]
        register    (name)      (Controller)
        listen      (path)      (callback)
    [Contollers]
        Base
        Repeat
        If
        ElseIf
        Else
    [Unclassified]
        set
        get
        listen
*/

const pb = function(path) {

};

pb.symbol = Symbol('pb');

pb.watch = path => {

}

pb[pb.symbol] = {

};


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

class Storage {

    constructor() {
        /**
         *
         */
        this[pb.symbol] = {
            'listeners': {}
        };
    }

    static isPrimitive(val) {
        /**
         * Primitive types: number, string, boolean, undefined, null, and symbol.
         */
        return val === null || typeof val !== 'object';
    }

    static get(target, path) {
        /**
         * Trap for get requests on storage instances
         */
        console.log(`get: ${path.toString()}`);
        return target[path];
    }

    static set(target, path, value) {
        /**
         * Trap for Set requests to storage instances
         */
        console.log(`set: ${path}`);
        target[path] = value;

        const listeners = target[this.symbol].listeners;

        if (listeners[path]) {
            listeners[path].forEach(function(callback) {
                callback(value);
            });
        }

        return true;
    }

    static listen(storage, path, callback) {
        /**
         * Add listener to storage instance
         */
        const listeners = storage[this.symbol].listeners;
		if (listeners[path] === undefined) {
		    listeners[path] = new Set()
        }
		listeners[path].add(callback);
    }

    static ignore(storage, path, callback) {
        /**
         * Remove listener from storage instance
         */
        const listeners = storage[this.symbol].listeners;
		if (listeners[path]) {
		    return listeners[path].delete(callback);
		}
        return false;
    }
}

class StorageObject {

    static get new() {
        /**
         *
         */
        const storage = new this;
        return new Proxy(storage, {
            get: this.get.bind(this),
            set: this.set.bind(this)
        });
    }
}
/**
 * Base Controller
 */

pb.Base = class Base {

    constructor(template) {
        /**
         * @param template
         */
        this.template = template;
        this.template[pb.symbol] = this;
        this.children = [];
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

pb.register('base', pb.Base);
