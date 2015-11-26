/**
 * PbScope
 */

function PbScope(elem) {
    this.Super.call(this, elem);
    this.$data = {};
    this._data = {};
    this.children = new Set();
}

PbScope.prototype = pb.inherit(PbScope, PbBase);
PbScope.prototype.tagName = 'pb-scope';
PbScope.prototype.attrs = new Map([
    ['pg-id', function(val) {
        var fn = window[val];
        if (typeof fn === 'function') {
            throw this('Unable to initialize scope', val);
        }
        fn(this.$data);
    }]
]);

PbScope.prototype.attached = function() {

    this.setId();
    this.setParent();
    this.setChildren();

    fn(this.$data);
};

PbScope.prototype.detached = function() {

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
        if (child.$pb instanceof PbScope) {
            this.children.add(child.$pb);
        }
    }
};

pb.register(PbScope);
