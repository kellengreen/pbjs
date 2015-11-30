"use strict";

var pb = {

    symbol: Symbol('pb'),

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
