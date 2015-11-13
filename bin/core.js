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

function register(options,name, Element, created, attached, detached, changed) {
    var proto = Object.create(Element.prototype);
    proto.createdCallback = options.created || new Function;
    proto.attachedCallback = attached;
    proto.detachedCallback = detached;
    proto.attributeChangedCallback = changed;
    document.registerElement(options.name, {prototype: proto});
}

//function kwfn(fn, required, optional) {
//    return function(kwargs) {
//        for (var prop in kwargs) {
//            if (kwargs.hasOwnProperty(prop)) {
//
//            }
//        }
//        return fn(kwargs)
//    }
//}
//
//
//var f = kwfn(function(options) {
//
//}, new Set()
//    .add('name')
//    .add('Element')
//, {
//    created: new Function,
//    attached: new Function,
//    detached: new Function,
//    changed: new Function
//});