/**
 * WebComponent Callbacks
 */

pb.BaseElement = class extends HTMLElement {

    /**
     * WebComponent Callbacks
     */

    createdCallback() {
        /**
         *
         */
    };

    attachedCallback() {
        /**
         *
         */

        // exec attribute changed callbacks
        for (var i = 0; i < this.attributes.length; i++) {
            var attr = this.attributes[i];
            this.attributeChangedCallback(attr.name, undefined, attr.value);
        }
    }

    detachedCallback() {
        /**
         *
         */
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        /**
         *
         */
        var fnName = '$' + name.replace(/-([a-z])/ig, function(m) {
                return m[1].toUpperCase();
            }) + 'Changed',
            fnObj = this[fnName];

        if (typeof fnObj === 'function') {
            fnObj(val);
        }
    }

    /**
     * Extended Methods
     */

    $error() {
        /**
         *
         */
        throw this + ' > ' + arguments.join(' > ');
    }

    /**
     * Static Methods
     */

    static $register(name) {
        /**
         *
         */
        document.registerElement(name, {prototype: this.prototype});
    }
};
