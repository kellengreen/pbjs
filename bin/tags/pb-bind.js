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

