/**
 *
 */

pb.ProviderElement = class extends pb.BaseElement {

    /**
     *
     */

    createdCallback() {
        /**
         *
         */
        this.provider = null;
    }

    attchedCallback() {
        /**
         *
         */
        super.attachedCallback();
    }

    detachedCallback() {
        /**
         *
         */
        // update dependants
        this.dependants.forEach(function(elem) {
            elem.setProvider();
        }, this);

        // update self
        this.provider = null;
        this.dependants.clear();

        super.detached();
    }

    /**
     * Extended Methods
     */

    //$setDependants() {
    //    var elems = this.querySelectorAll(pb.PbScope.tagName);
    //    for (var i = 0, child; child = elems[i]; i++) {
    //        if (child[pb.symbol] instanceof pb.PbScope) {
    //            this.dependants.add(child[pb.symbol]);
    //        }
    //    }
    //}

    $idChanged(val) {
        var fn = window[val];
        if (typeof fn === 'function') {
            this.error('Unable to initialize scope', val);
        }
        fn(this.data);
    }

};

pb.ScopeElement.$register('pb-scope');
