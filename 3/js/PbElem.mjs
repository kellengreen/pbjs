export default class PbElem {
    /**
     * 
     */
    constructor(elem) {
        this.elem = elem;
        this.observer = this.getObserver();
    }

    /**
     * Listens to the DOM for changes.
     */
    getObserver() {
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.type === `childList`) {

                    for (const elem of mutation.addedNodes) {
                        this.findRegisteredChildren(elem);
                    }

                    for (const elem of mutation.removedNodes) {

                    }

                } else if (mutation.type === `attributes`) {

                }
                // else if (mutation.type === `characterData`) {

                // }
            }
        });

        observer.observe(this.elem, {
            attributes: true
        });

        return observer;
    }

    /**
     * Callback when an element is removed from the DOM.
     */
    removed() {

    }

}
