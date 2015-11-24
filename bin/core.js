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

function PbElement() {
    HTMLElement.call(this);
}

PbElement.prototype = Object.create(HTMLElement.prototype);
PbElement.prototype.constructor = PbElement;