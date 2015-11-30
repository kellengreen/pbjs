"use strict";

var pb = {

    symbol: Symbol('pb'),

    Pb: class {

        constructor(elem) {
            this.elem = elem;
        }

        created() {

        }

        attached() {

            // exec attribute changed callbacks
            for (var i = 0; i < this.elem.attributes.length; i++) {
                var attr = this.elem.attributes[i];
                this.attrChanged(attr.name, attr.value);
            }
        }

        detached() {

        }
        
        attrChanged(name, val) {
            var fnName = name.replace(/-([a-z])/ig, function(m) {
                    return m[1].toUpperCase();
                }) + 'Changed',
                fn = this[fnName];

            if (typeof fn === 'function') {
                fn(val);
            }
        }

        error(msg, val) {
            throw msg + ': ' + val + ' (' + this + ')';
        }
    },

    register: function(Pb) {

        proto = Object.create(Pb.Element.prototype);

        proto.createdCallback = function () {
            this[pb.symbol] = new Pb(this);
            this[pb.symbol].created();
        };

        proto.attachedCallback = function () {
            this[pb.symbol].attached();
        };

        proto.detachedCallback = function () {
            this[pb.symbol].detached();
        };

        proto.attributeChangedCallback = function (attr, oldVal, newVal) {
            this[pb.symbol].attrChanged(attr, newVal);
        };

        return document.registerElement(Pb.tagName, {prototype: proto});
    }
};
