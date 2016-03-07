    /**
     * PbScopeElement
     */

    class PbScopeElement extends PbElement {

        /**
         *
         */

        createdCallback() {
            /**
             *
             */
            this._proxy = PbProxy.init({}, this);
            this._listeners = {};
            this._parent = null;
        }

        attachedCallback() {
            /**
             *
             */
            let attr = this._getAttr('u-id');
            this._setScope(attr);
            console.dir(this._proxy);
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
        }

        attributeChangedCallback(attrName, oldVal, newVal) {
            /**
             *
             */
            if (attrName === 'u-id') {
                this._setScope(attrName)
            }
        }

        _setScope(attr) {
            let fn = window[attr];
            if (typeof fn !== 'function') {
                throw `Unable to initialize scope function "${attr}"`;
            }
            fn(this._proxy);
        }



        _getValFromStr(str) {

        }

        //$setDependants() {
        //    var elems = this.querySelectorAll(pb.PbScope.tagName);
        //    for (var i = 0, child; child = elems[i]; i++) {
        //        if (child[pb.symbol] instanceof pb.PbScope) {
        //            this.dependants.add(child[pb.symbol]);
        //        }
        //    }
        //}


    }

    PbScopeElement.init('u-scope');