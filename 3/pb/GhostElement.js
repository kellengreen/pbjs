/**
 * 
 */
class GhostElement {
    /**
     *
     */
    constructor(elem) {
        this.html = this.getInnerHTML(elem);
        this.attributes = this.copyAttribtes(elem);
        this.parent = elem.parentElement;
        // this.childPosition = this.

        // this.pointers = this.createDomPointers(elem);

        this.observer = this.getParentObserver(elem);

        // elem.parentElement.removeChild(elem);
        // remove element from DOM
    }

    /**
     * 
     */
    parentRemoved() {

    }

    /**
     * 
     */
    childAdded(elem) {
        console.log(`child added`);
        console.dir(elem);
    }
    
    /**
     * 
     */
    childRemoved(elem) {
        console.log(`child removed`);
        console.dir(elem);
    }

    /**
     * 
     */
    // onParent

    /**
     * 
     */
    getParentObserver(elem) {
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                console.dir(mutation);
                // Added nodes.
                for (const elem of mutation.addedNodes) {
                    if (elem instanceof HTMLElement) {
                        this.childAdded(elem);
                    }
                }
                
                // Removed nodes.
                for (const elem of mutation.removedNodes) {
                    if (elem instanceof HTMLElement) {
                        this.childRemoved(elem);
                    }
                }
            }
            console.log('-');
        });

        observer.observe(elem.parentElement, {
            childList: true,
            characterData: true,
        });

        return observer;
    }

    /**
     * 
     * @param {HTMLElement} elem 
     */
    getInnerHTML(elem) {
        const child = elem.firstElementChild;
        return (child instanceof HTMLTemplateElement) ? child.innerHTML : elem.innerHTML;
    }

    /**
     * 
     * @param {HTMLElement} elem 
     */
    copyAttribtes(elem) {
        const attributes = {};
        for (const {name, value} of elem.attributes) {
            attributes[name] = value;
        }
        return attributes;
    }

    /**
     * Creat DOM pointers.
     * @param {HTMLElement} elem 
     */
    createDomPointers(elem) {
        const pointers = [];
        const tag = elem.tagName.toLowerCase();
        pointers[0] = document.createComment(`${tag}-begin`);
        pointers[1] = document.createComment(`${tag}-end`);
        
        const parent = elem.parentElement;
        parent.insertBefore(pointers[0], elem)
        parent.insertBefore(pointers[1], elem.nextSibling);

        return pointers;
    }

    /**
     * 
     */
    destroy() {

    }
}

export default GhostElement;
