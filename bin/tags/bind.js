var PbBindElement = new Function();
PbBindElement.prototype = Object.create(HTMLElement.prototype);
PbBindElement.prototype.constructor = PbBindElement;

/**
 * Static Properties
 */

PbBindElement._tagName = 'pb-bind';
PbBindElement._attrName = 'pb-to';

/**
 * Class Methods
 */

PbBindElement.prototype._init = function() {

    var name = this.getAttribute(PbBindElement._attrName);
    this._scope = PbScopeElement._getParentScope(this);
    this.textContent = this._scope.$data[name];
};

/**
 * Callbacks
 */

PbBindElement.prototype.createdCallback = function() {
    console.log('bind__created');
    this._scope = null;
};

PbBindElement.prototype.attachedCallback = function() {
    console.log('bind__attached');
    this._init();
};

PbBindElement.prototype.detachedCallback = function() {
    console.log('bind__detached');
    this._scope = null;
    this.textContent = null;
};

PbBindElement.prototype.attributeChangedCallback = function() {
    //console.log('attrChanged');
};

document.registerElement(PbBindElement._tagName, {prototype: PbBindElement.prototype});
