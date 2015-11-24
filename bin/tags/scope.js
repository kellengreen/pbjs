//var PbScopeElement = function(){console.log('constructor')};
var PbScopeElement = new Function();
PbScopeElement.prototype = Object.create(HTMLElement.prototype);
PbScopeElement.prototype.constructor = PbScopeElement;

/**
 * Static Properties
 */

PbScopeElement._tagName = 'pb-scope';
PbScopeElement._attrId = 'pb-id';

/**
 * Static Methods
 */

PbScopeElement._getParentScope = function(root) {
    var parent = root.parentNode;
    while (parent) {
        if (parent instanceof PbScopeElement) {
            return parent;
        }
        parent = parent.parentNode;
    }
    return null;
};

PbScopeElement._getChildScopes = function(root) {
    var children = new Set();
    var elems = root.querySelectorAll(PbScopeElement._tagName);
    for (var i = 0, elem; elem = elems[i]; i++) {
        children.add(elem);
    }
    return children;
};

/**
 * Class Methods
 */

PbScopeElement.prototype._init = function() {

    var id = this.getAttribute(PbScopeElement._attrId),
        fn = window[id];

    if (typeof fn !== 'function') {
        throw 'Unable to initialize scope function: "' + id + '"';
    }

    this._parent = PbScopeElement._getParentScope(this);
    this._children = PbScopeElement._getChildScopes(this);

    fn(this.$data);

    //console.log(id);
    //console.log('data');
    //console.dir(this.$data);
    //console.log('parent');
    //console.dir(this._parent);
    //console.log('children');
    //console.dir(this._children);
    //console.log('-----');
};



/**
 * Callbacks
 */

PbScopeElement.prototype.createdCallback = function() {
    //console.log('created');
    this.$data = {};
    this._data = {};
};

PbScopeElement.prototype.attachedCallback = function() {
    //console.log('attached');
    this._init();
};

PbScopeElement.prototype.detachedCallback = function() {
    console.log('detached');

    // update parent
    if (this._parent) {
        this._parent._children.remove(this);
    }

    // update children
    this._children.forEach(function(child) {
        child._parent = this._parent;
    }, this);

    // update self
    this._parent = null;
    this._children.clear();
};

PbScopeElement.prototype.attributeChangedCallback = function() {
    console.log('attrChanged');
};

document.registerElement(PbScopeElement._tagName, {prototype: PbScopeElement.prototype});
