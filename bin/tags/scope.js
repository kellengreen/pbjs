/**
 * Scope
 */

function Scope(elem) {
    this.elem = elem;
    this.data = {};
}

/**
 * Static Properties
 */

Scope.scopes = {};

/**
 * Class Methods
 */

Scope.prototype.init = function() {
    this.fn = window[this.elem.id];

    if (typeof this.fn !== 'function') {
        throw 'Unable to initialize scope: "' + this.elem.id + '"';
    }

    this.data.parent = this.getParentData();
    this.data.children = this.getChildrenData();
    this.fn(this.data);
};

Scope.prototype.getParentData = function() {
    var parent = this.elem.parentNode;
    while (parent) {
        if (parent instanceof this.elem.constructor) {
            return Scope.scopes[parent.id].data;
        }
        parent = parent.parentNode;
    }
    return null;
};

Scope.prototype.getChildrenData = function() {
    return null;
};

/**
 * Register
 */

register('js-scope', HTMLElement, function() {
    Scope.scopes[this.id] = new Scope(this);
}, function() {
    Scope.scopes[this.id].init();
}, function() {

}, function() {

});
