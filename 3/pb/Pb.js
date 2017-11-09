/**
 * 
 */
class Pb {
    /**
     * 
     */
    constructor() {
        this.registrations = new Map();
        this.bodyObserver = null;
        
        this.whenDomIsReady(() => {
            // this.bodyObserver = this.getBodyObserver();
            // this.findRegisteredChildren(document.body);
        });
    }

    /**
     * Let's us know when the DOM is ready to be worked on.
     * @param {function} callback
     * @returns {undefined}
     */
    whenDomIsReady(callback) {
        if (document.readyState === `loading`) {
            const type = `readystatechange`;
            document.addEventListener(type, function listener() {
                document.removeEventListener(type, listener);
                callback();
            });
        } else {
            callback();
        }
    }

    /**
     * Listens for DOM in the <body>.
     */
    getBodyObserver() {
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                console.dir(mutation);

                for (const elem of mutation.addedNodes) {
                    this.findRegisteredChildren(elem);
                }

                for (const elem of mutation.removedNodes) {

                }
            }
            console.log('-');
        });

        observer.observe(document.body, {
            childList: true,    // Children of the target.
            subtree: true,      // Children of the children.
        });

        return observer;
    }

    /**
     * 
     */
    findRegisteredChildren(target) {
        console.log(`Searching...`);
        console.dir(target);
        if (this.registeredSelector !== ``) {
            for (const elem of document.querySelectorAll(this.registeredSelector)) {
                console.log(`match`);
                console.dir(elem);
                const registeredName = elem.getAttribute(this.idAttribute);
                const constructor = this.registeredConstructors.get(registeredName);
                const d = new constructor(elem);
            }
        }
    }

    /**
     * Register a new element tag.
     * @param {string} tagName 
     * @returns {undefined}
     */
    register(tagName, constructor) {
        this.registrations.set(tagName, constructor);
        this.registeredSelector = this.getRegisteredSelector();
    }

    /**
     * Register a new element tag.
     * @param {string} tagName 
     * @returns {undefined}
     */
    unregister(tagName) {
        this.registeredConstructors.delete(tagName);
        this.registeredSelector = this.getRegisteredSelector();
    }

    /**
     * @returns {string}
     */
    getRegisteredSelector() {
        const selectors = [];
        for (const tag of this.registeredConstructors.keys()) {
            selectors.push(tag);
        }
        return selectors.join(',');
    }
}

export default Pb;