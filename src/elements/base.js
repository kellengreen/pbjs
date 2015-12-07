/**
 * WebComponent Callbacks
 */

pb.Base = class extends HTMLElement {

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
        for (var i = 0; i < this.elem.attributes.length; i++) {
            var attr = this.elem.attributes[i];
            this.attrChanged(attr.name, attr.value);
        }
    };

    detachedCallback() {
        /**
         *
         */
    };

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
    };

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
