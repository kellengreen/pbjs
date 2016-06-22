//=require ../global/main.js

pb.DomManager = class {
    /**
     *
     */
    constructor() {
        /**
         *
         */
        this.names = new Map();

        // listen for dom changes
        const options = {
            childList: true,
            subtree: true,
            attributes: true
        };
        const callback = this.parseMutations.bind(this);
        const observer = new MutationObserver(callback);
        observer.observe(document.body, options);
    }

    parseMutations(mutations) {
        /**
         *
         */
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes') {
                const elem = mutation.target;
                const name = mutation.attributeName;
                const value = elem.getAttribute(name);
                this.attrChanged(elem, name, value);
            } else if (mutation.type === 'childList') {
                this.loopPbElems(mutation.addedNodes, this.pbElemAdded);
                this.loopPbElems(mutation.removedNodes, this.pbElemRemoved);
            }
        });
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
         *
         */
        if (name.starsWith('pb-')) {
            if (name === 'pb-is') {

            } else if (name === 'pb-id') {

            } else if (name === 'pb-id') {

            }
            console.log('Changed');
            console.dir(elem);
            console.log(name);
            console.log(value);
        }
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

    register(name, PbElement) {
        /**
         *
         */
        if (this.names.has(name)) {
            throw `Element "${name}" is already registered`;
        }

        this.names.set(name, PbElement);

        // find existing elements
        const elems = document.querySelectorAll(`[pb-is^='${name}']`);
        for (let i = 0, elem; elem = elems[i]; i++) {
            let pbElement = new PbElement();
            pbElement.promote(elem);
        }
    }
};
