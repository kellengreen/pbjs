"use strict";
const pb = {};
/**
 *
 */

pb.Map = class extends Map {

    /**
     * Builtin Methods
     */

    constructor(iterable, nameSpace) {
        super(iterable);
        this.parent = 'P';
    }

    set(key, val) {
        super.set(key, val);
        this.$onSet(key, val);
    }

    delete(key) {
        super.delete(key);
        this.$onDelete(key);
    }

    clear() {
        super.clear();
        this.$onClear();
    }

    /**
     * Additional Methods
     */

    $onSet(key, val) {

    }

    $onDelete(key) {

    }

    $onClear() {

    }

    $setSilent(key, val) {
        super.set(key, val);
    }

    $toStr(val) {

    }

    /**
     * Static Methods
     */

    static $fromObj(obj) {
        /**
         *
         */
        var pbMap = new PbMap();
        for (var key of Object.keys(obj)) {
            var val = typeof obj[key] === 'object' ? PbMap.fromObj(obj[key]) : obj[key];
            pbMap.set(key, val);
        }
        return pbMap;
    }

    static $fromStr(str) {
        /**
         *
         */
        var obj = JSON.parse(str);
        return PbMap.fromObj(obj);
    }
};
/**
 *
 */

pb.Set = class extends Set {
    /**
     *
     */

    constructor(root, iterable) {
        /**
         *
         */
        super(iterable);
        this.parent = 'P';
    }

    add(val) {
        /**
         *
         */
        super.add(val);
    }

    delete(key) {
        /**
         *
         */
        super.delete(key);
    }

    clear() {
        /**
         *
         */
        super.clear();
    }
};

/**
 * WebComponent Callbacks
 */

pb.BaseElement = class extends HTMLElement {

    /**
     * WebComponent Callbacks
     */

    createdCallback() {
        /**
         *
         */
    };

    attachedCallback() {
        /**
         *
         */

        // exec attribute changed callbacks
        for (var i = 0; i < this.elem.attributes.length; i++) {
            var attr = this.elem.attributes[i];
            this.attrChanged(attr.name, attr.value);
        }
    }

    detachedCallback() {
        /**
         *
         */
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        /**
         *
         */
        var fnName = '$' + name.replace(/-([a-z])/ig, function(m) {
                return m[1].toUpperCase();
            }) + 'Changed',
            fnObj = this[fnName];

        if (typeof fnObj === 'function') {
            fnObj(val);
        }
    }

    /**
     * Extended Methods
     */

    $error() {
        /**
         *
         */
        throw this + ' > ' + arguments.join(' > ');
    }

    /**
     * Static Methods
     */

    static $register(name) {
        /**
         *
         */
        document.registerElement(name, {prototype: this.prototype});
    }
};

/**
 *
 */

pb.ProviderElement = class extends pb.BaseElement {

    /**
     *
     */

    createdCallback() {
        /**
         *
         */
        this.provider = null;
    }

    attchedCallback() {
        /**
         *
         */
        super.attachedCallback();
    }

    detachedCallback() {
        /**
         *
         */
        // update dependants
        this.dependants.forEach(function(elem) {
            elem.setProvider();
        }, this);

        // update self
        this.provider = null;
        this.dependants.clear();

        super.detached();
    }

    /**
     * Extended Methods
     */

    //$setDependants() {
    //    var elems = this.querySelectorAll(pb.PbScope.tagName);
    //    for (var i = 0, child; child = elems[i]; i++) {
    //        if (child[pb.symbol] instanceof pb.PbScope) {
    //            this.dependants.add(child[pb.symbol]);
    //        }
    //    }
    //}

    $idChanged(val) {
        var fn = window[val];
        if (typeof fn === 'function') {
            this.error('Unable to initialize scope', val);
        }
        fn(this.data);
    }

};

pb.ScopeElement.$register('pb-scope');

/**
 *
 */

pb.BindElement = class extends pb.BaseElement {
    /**
     *
     */

    constructor(elem) {
        /**
         *
         */
        super(elem);
        this.provider = null;
    }

    attached() {
        /**
         *
         */
        this.setProvider();
        super.attached();
    }

    detached() {
        /**
         *
         */
        this.provider = null;
        this.elem.textContent = null;
    }

    /**
     * Extended Methods
     */

    $idChanged(key) {
        /**
         *
         */
        var val = this.provider.data[key];
        if (val === undefined) {
            this.error('Unable to get property from parent scope');
        }
        this.$draw(val);
    }

    $draw(val) {
        /**
         *
         */
        this.textContent = val;
    }

    $setProvider() {
        /**
         *
         */
        var parent = this.elem.parentNode;
        while (parent) {
            if (parent instanceof pb.ScopeElement) {
                this.provider = elem[$.symbol];
                break;
            }
            parent = parent.parentNode;
        }
        this.error('No parent scope found in DOM');
    }
};

pb.BindElement.register('pb-bind');

