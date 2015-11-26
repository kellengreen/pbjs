var pb = {};
pb.register = function(Pb) {

    proto = Object.create(Pb.prototype.Element.prototype);

    proto.createdCallback = function() {
        this.$pb = new Pb(this);
        this.$pb.created();
    };

    proto.attachedCallback = function() {
        this.$pb.attached();
    };

    proto.detachedCallback = function() {
        this.$pb.detached();
    };

    proto.attributeChangedCallback = function(attr, oldVal, newVal) {
        this.$pb.attrChanged(attr, oldVal, newVal);
    };

    return document.registerElement(Pb.prototype.tagName, {prototype: proto});
};

pb.inherit = function(Pb, PbSuper) {
    Pb.prototype = Object.create(PbSuper.prototype);
    Pb.prototype.constructor = Pb;
    Pb.prototype.Super = PbSuper;
    return Pb.prototype;
};

function PbAttr() {
    this.val;
    this.required = False;
    this.fn = new Function();
}


//pb.new = function(constructor, Super) {
//  return function() {
//
//      var Pb = new constructor();
//  }
//};