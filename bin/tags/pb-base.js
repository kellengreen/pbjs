/**
 * PbBase
 */

function PbBase(elem) {
    this.elem = elem;
    this._atters = new Map();
}

PbBase.prototype.Element = HTMLElement;
PbBase.prototype.attrs = new Map();

PbBase.prototype.created = function() {
    this.setAttrs();
};

PbBase.prototype.attrChanged = function(attr, oldVal, newVal) {
    var fn = this.attrs.get(attr);
    if (fn) {
        this.setAttr(attr, newVal);
    }
};

PbBase.prototype.setAttrs = function() {
    for (var attr of this.attrs) {
        var key = attr[0],
            required = attr[1],
            val = this.elem.getAttribute(key);
            this.setAttr(key, val);
    }
};

PbBase.prototype.dashToCamel = function(str) {

};

PbBase.prototype.error = function(msg, val) {
    throw msg + ': ' + val + ' (' + this + ')';
};
