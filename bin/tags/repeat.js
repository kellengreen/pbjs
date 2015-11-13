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
