

class ElementManager {
    /**
     * 
     */
    constructor(element) {
        this.element = element;
        this.render();
    }

    /**
     * 
     */
    render() {
        this.insertHTML(this.ghostElement.html);
    }

    /**
     * 
     */
    insertHTML(html) {
        // TODO: COMMENTS ELEMENTS DONT HAVE insertAdjacentHTML, NEED TO COME UP WITH A SOLUTION
        // this.ghostElement.pointers[0].insertAdjacentHTML(`afterend`, html);
    }

    /**
     * 
     */
    clear() {

    }

    /**
     * 
     */
    destroy() {

    }
}

export default ElementManager;