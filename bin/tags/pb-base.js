"use strict";

/**
 * PbBase
 */

class PbBase {

    constructor(elem) {
        this.elem = elem;
    }

    created() {

    }

    attached() {

        // exec attribute changed callbacks
        for (var i = 0; i < this.elem.attributes.length; i++) {
            var attr = this.elem.attributes[i];
            this.attrChanged(attr.name, attr.value);
        }
    }

    detached() {

    }

    attrChanged(name, val) {
        var fnName = name.replace(/-([a-z])/ig, function(m) {
                return m[1].toUpperCase();
            }) + 'Changed',
            fn = this[fnName];

        if (typeof fn === 'function') {
            fn(val);
        }
    }

    error(msg, val) {
        throw msg + ': ' + val + ' (' + this + ')';
    }
}
