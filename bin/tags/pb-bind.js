function PbBind(elem) {
    this.elem = elem;
    this.parent = null;
}

PbBind.tagName = 'pb-bind';
PbBind.Element = HTMLElement;
PbBind.attrName = 'pb-to';

PbBind.prototype.attached = function() {
    var name = this.elem.getAttribute(PbBind.attrName);
    this.parent = PbScope.getParent(this.elem);
    this.write(this.parent.$data[name]);
};

PbBind.prototype.detached = function() {
    this.parentScope = null;
    this.elem.textContent = null;
};

PbBind.prototype.attrChanged = function() {
    console.log('attrChanged');
};

PbBind.prototype.write = function(val) {
    var elem = document.createElement('p');
    elem.appendChild(document.createTextNode(val));
    this.elem.textContent = elem.innerHTML;
};

pb.register(PbBind);

