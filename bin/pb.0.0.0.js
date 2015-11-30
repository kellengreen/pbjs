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

/**
 * PbBind
 */

function PbBind(elem) {
    this.Super.call(this, elem);
}

PbBind.prototype = pb.inherit(PbBind, PbBase);
PbBind.prototype.tagName = 'pb-bind';

PbBind.prototype.attached = function() {
    PbScope.prototype.setParent.call(this);
    this.write(this.parent.$data[this.id]);
};

PbBind.prototype.detached = function() {
    this.parent = null;
    this.elem.textContent = null;
};

PbBind.prototype.setId = function() {
    this.Super.prototype.setId.call(this);
    this.parent.$data[this.id];
};

PbBind.prototype.clean = function(val) {
    if (val === undefined) {
        throw 'Unable to get property from parent scope: ' + this.id;
    }

    return val;
};

PbBind.prototype.write = function(val) {
    this.elem.textContent = this.clean(val);
};

pb.register(PbBind);



function PbCsv(elem) {
    PbBind(this, elem);
}

PbCsv.prototype = Object.create(PbBind.prototype);
PbCsv.prototype.constructor = PbCsv;

PbCsv.tagName = 'pb-csv';

PbCsv.prototype.clean = function(val) {
    return val.split(', ');
};

pb.register(PbCsv);
var proto = Object.create(HTMLElement.prototype);

proto.createdCallback = function() {

};

proto.attachedCallback = function() {

};

proto.detachedCallback = function() {

};

proto.attributeChangedCallback = function() {

};

document.registerElement('js-repeat', {prototype: proto});

/**
 * PbScope
 */

class PbScope extends PbBase {

    constructor(elem) {
        super(elem);
        this.data = {};
        this.children = new Set();

    }

    attached() {
        this.setParent();
        this.setChildren();
        super.attached();
    }

    detached() {

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

    setParent() {
        var parent = this.elem.parentNode;
        while (parent) {
            if (parent[pb.symbol] instanceof PbScope) {
                this.parent = parent[pb.symbol];
                break;
            }
            parent = parent.parentNode;
        }
    }

    setChildren() {
        var elems = this.elem.querySelectorAll(PbScope.prototype.tagName);
        for (var i = 0, child; child = elems[i]; i++) {
            if (child[pb.symbol] instanceof PbScope) {
                this.children.add(child[pb.symbol]);
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

}

PbScope.prototype.detached = function() {


};

PbScope.prototype.setParent = function() {
    console.log(this);
    var parent = this.elem.parentNode;
    while (parent) {
        console.dir(parent);
        if (parent.$pb instanceof PbScope) {
            this.parent = parent.$pb;
            break;
        }
        parent = parent.parentNode;
    }
};

PbScope.prototype.setChildren = function() {
    var elems = this.elem.querySelectorAll(PbScope.prototype.tagName);
    for (var i = 0, child; child = elems[i]; i++) {
        if (child[pb.symbol] instanceof PbScope) {
            this.children.add(child[pb.symbol]);
        }
    }
};

PbScope.Element = HTMLElement;
PbScope.tagName = 'pb-scope';

pb.register(PbScope);
