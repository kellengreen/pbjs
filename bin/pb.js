"use strict";
const pb = {
    elemCreated: new Symbol(),
    elemAttached: new Symbol(),
    elemDetached: new Symbol(),
    elemChanged: new Symbol(),
    valChanged: new Symbol(),
    valDeleted: new Symbol(),
    valCleared: new Symbol()
};
/**
 *
 */

pb.Map = class extends Map {

    /**
     * Builtin Methods
     */

    constructor(iterable) {
        super(iterable);
        this.listeners = new Set();
    }

    set(key, val) {
        super.set(key, val);
        console.log('set: ' + this);

         Window.requestAnimationFrame()
    }

    delete(key) {
        super.delete(key);
        console.log('delete: ' + this);
    }

    clear() {
        super.clear();
        console.log('clear: ' + this);
    }

    /**
     * Additional Methods
     */

    addListener(name, val) {

    }

    removeListner(listener) {

    }

    onClear() {

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

pb.KeylessMap = class extends Map {

    /**
     * Builtin Methods
     */

    constructor(array) {
        var i = 0,
            iterable = [];
        array.forEach(function(item) {
            iterable.push([i, item]);
        });

        super(iterable);
        this.i = i;
        this.$listeners = new Map();
    }

    set(val) {
        var key = i++;
        super.set(key, val);
        this.$onChange(key, val);
    }

    delete(key) {
        super.delete(key);
        this[pb.valDeleted](key, val);
    }

    clear() {
        super.clear();
        this.i = 0;
        this[pb.valCleared]();
    }

    onSet(key, val) {

    }

    onDelete(key) {

    }

    onClear() {

    }

};
/**
 *
 */

pb.Set = class extends Set {
    /**
     *
     */

    constructor(iterable) {
        /**
         *
         */
        super(iterable);
    }

    add(val) {
        /**
         *
         */
        super.add(val);
        this[pb.valChanged](val);
    }

    delete(val) {
        /**
         *
         */
        super.delete(val);
        this[pb.valDeleted](val);
    }

    clear() {
        /**
         *
         */
        super.clear();
        this[pb.valCleared]();
    }

    [pb.valChanged](val) {

    }

    [pb.valDeleted](val) {

    }

    [pb.valCleared]() {

    }

};

/**
 * WebComponent Callbacks
 */

pb.Element = class extends HTMLElement {

    /**
     * WebComponent Callbacks
     */

    createdCallback() {
        /**
         *
         */
        super[pb.symbols.created]();
    };

    [pb.symbols.created]() {
        /**
         *
         */
    }

    attachedCallback() {
        /**
         *
         */

        // exec attribute changed callbacks
        for (var i = 0; i < this.attributes.length; i++) {
            var attr = this.attributes[i];
            this.attributeChangedCallback(attr.name, undefined, attr.value);
        }
        super[pb.symbols.attached]();

    }

    [pb.symbols.attached]() {
        /**
         *
         */
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
        var fnName = name.replace(/-([a-z])/ig, function(m) {
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

    error() {
        /**
         *
         */
        throw this + ' > ' + arguments.join(' > ');
    }

    /**
     * Static Methods
     */

    static register(name) {
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

