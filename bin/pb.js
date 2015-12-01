"use strict";

var pb = {};

pb.symbol = Symbol('pb');

pb.register = function(Pb) {

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
};

/**
 * PbBase Class
 */
pb.PbScope = class {

    constructor(elem) {
        this.elem = elem;
        this.provider = null;
    }

    created() {

    }

    attached() {

        // exec attribute changed callbacks
        for (var i = 0; i < this.elem.attributes.length; i++) {
            var attr = this.elem.attributes[i];
            this.attrChanged(attr.name, attr.value);
        }

        this.setProvider();
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

    setProvider() {
        var parent = this.elem.parentNode;
        while (parent) {
            if (parent[pb.symbol] instanceof PbScope) {
                this.provider = parent[pb.symbol];
                break;
            }
            parent = parent.parentNode;
        }
    }

    error(msg, val) {
        throw msg + ': ' + val + ' (' + this + ')';
    }
};

/**
 * PbScope
 */

pb.PbScope = class extends pb.PbBase {

    constructor(elem) {
        super(elem);
        this.data = {};
        this.dependants = new Set();

    }

    attached() {
        super.attached();
        this.setDependants();
    }

    detached() {
        super.attached();

        // update parent
        if (this.parent) {
            this.parent.children.remove(this.elem);
        }

        // update children
        this.children.forEach(function(elem) {
            elem.parent = this.parent;
        }, this);

        // update self
        this.parent = null;
        this.children.clear();
    }

    setDependants() {
        var elems = this.elem.querySelectorAll(PbScope.tagName);
        for (var i = 0, child; child = elems[i]; i++) {
            if (child[pb.symbol] instanceof PbScope) {
                this.dependants.add(child[pb.symbol]);
            }
        }
    }

    pbIdChanged(val) {
        var fn = window[val];
        if (typeof fn === 'function') {
            this.error('Unable to initialize scope', val);
        }
        fn(this.data);
    }

};

PbScope.Element = HTMLElement;
PbScope.tagName = 'pb-scope';

pb.register(PbScope);

/**
 * PbBind
 */

class PbBind extends pb.PbBase {

    attached() {
        super.attached();
        this.draw(this.parent.$data[this.id]);
    }

    detached() {
        this.provider = null;
        this.elem.textContent = null;
    }

    clean(val) {
        if (val === undefined) {
            throw 'Unable to get property from parent scope: ' + this.id;
        }
        return val;
    }

    draw() {
        this.elem.textContent = this.clean(val)
    }

    pgIdChanged(val) {
        this.Super.prototype.setId.call(this);
        this.parent.$data[this.id];
    }
}

PbScope.Element = HTMLElement;
PbScope.tagName = 'pb-bind';

pb.register(PbBind);

