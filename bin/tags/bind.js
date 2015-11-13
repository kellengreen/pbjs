/**
 * Bind
 */

var bindElem = (function() {

    var proto = Object.create(HTMLElement.prototype);

    proto.createdCallback = function() {
        this._scopeElem = null;
        this._setScopeElem();
    };

    proto.attachedCallback = function() {

    };

    proto.detachedCallback = function() {
        console.log('detached');
    };

    proto.attributeChangedCallback = function() {
        console.log('changed');
    };

    proto._setScopeElem = function() {
        var elem = this;
        while (parent = elem.parentElement) {
            if (parent instanceof ScopeElem) {
                elem._scopeElem = parent;
                break;
            }
            elem = parent;
        }
    };

    return document.registerElement('u-bind', {prototype: proto});

})();