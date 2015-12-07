/**
 *
 */

pb.BindElement = class extends pb.BaseElement {
    /**
     *
     */

    constructor(elem) {
        /**
         *
         */
        super(elem);
        this.provider = null;
    }

    attached() {
        /**
         *
         */
        this.setProvider();
        super.attached();
    }

    detached() {
        /**
         *
         */
        this.provider = null;
        this.elem.textContent = null;
    }

    /**
     * Extended Methods
     */

    $idChanged(key) {
        /**
         *
         */
        var val = this.provider.data[key];
        if (val === undefined) {
            this.error('Unable to get property from parent scope');
        }
        this.$draw(val);
    }

    $draw(val) {
        /**
         *
         */
        this.textContent = val;
    }

    $setProvider() {
        /**
         *
         */
        var parent = this.elem.parentNode;
        while (parent) {
            if (parent instanceof pb.ScopeElement) {
                this.provider = elem[$.symbol];
                break;
            }
            parent = parent.parentNode;
        }
        this.error('No parent scope found in DOM');
    }
};

pb.BindElement.register('pb-bind');
