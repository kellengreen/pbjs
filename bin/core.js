function escapeHtml(str) {
    var elem = document.createElement('p');
    elem.appendChild(document.createTextNode(str));
    return elem.innerHTML;
}

// UNSAFE with unsafe strings; only use on previously-escaped ones!
function unescapeHtml(escapedStr) {
    var div = document.createElement('div');
    div.innerHTML = escapedStr;
    var child = div.childNodes[0];
    return child ? child.nodeValue : '';
}

var pb = {};
pb.register = function(Pb) {

    proto = Object.create(Pb.Element.prototype);

    proto.createdCallback = function() {
        this.$pb = new Pb(this);
        //this.$pb.created();
    };

    proto.attachedCallback = function() {
        this.$pb.attached();
    };

    proto.detachedCallback = function() {
        this.$pb.detached();
    };

    proto.attributeChangedCallback = function() {
        this.$pb.attrChanged();
    };

    return document.registerElement(Pb.tagName, {prototype: proto});
};

/*

function Pb(elem) {
    console.log('construct');
    this.elem = elem;
}

Pb.tagName = 'pb-base';
Pb.Element = HTMLElement;

Pb.prototype.created = function() {
    console.log('created');
};

Pb.prototype.attached = function() {
    console.log('attached');
};

Pb.prototype.detached = function() {
    console.log('detached');
};

Pb.prototype.attrChanged = function() {
    console.log('attrChanged');
};

pb.register(Pb);

*/