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
