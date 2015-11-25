function PbScope(elem) {
    this.elem = elem;
    this.$data = {};
    this._data = {};
    this.parent = null;
    this.children = new Set();
}

PbScope.tagName = 'pb-scope';
PbScope.Element = HTMLElement;
PbScope.attrId = 'pb-id';

PbScope.getParent = function(root) {
    var parent = root.parentNode;
    while (parent) {
        if (parent.$pb instanceof PbScope) {
            return parent.$pb;
        }
        parent = parent.parentNode;
    }
    return null;
};

PbScope.getChildren = function(root) {
    var children = new Set();
    var elems = root.querySelectorAll(PbScope.tagName);
    for (var i = 0, elem; elem = elems[i]; i++) {
        children.add(elem.$pb);
    }
    return children;
};

PbScope.prototype.attached = function() {

    var id = this.elem.getAttribute(PbScope.attrId),
        fn = window[id];

    if (typeof fn !== 'function') {
        throw 'Unable to initialize scope function: ' + id;
    }

    this.parent = PbScope.getParent(this.elem);
    this.children = PbScope.getChildren(this.elem);

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

PbScope.prototype.attrChanged = function() {

};

PbScope.prototype.attrChanged = function() {

};

pb.register(PbScope);
