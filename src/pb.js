"use strict";
!function(){

var symbol = Symbol('pb');

function register(Pb) {

    proto = Object.create(Pb.Element.prototype);

    proto.createdCallback = function () {
        this[pb.symbol] = new Pb(this);
        this[pb.symbol].created();
    };

    proto.attachedCallback = function () {
        this[pb.symbol].attached();
    };

    proto.detachedCallback = function () {
        this[pb.symbol].detached();
    };

    proto.attributeChangedCallback = function (attr, oldVal, newVal) {
        this[pb.symbol].attrChanged(attr, newVal);
    };

    return document.registerElement(Pb.tagName, {prototype: proto});
}

class PbMap extends Map {
    constructor(root, iterable) {
        super(iterable);
        this.parent = 'P';
    }

    set(key, val) {
        super.set(key, val);
    }

    setSilent(key, val) {
        super.set();
    }

    delete(key) {
        super.delete(key);
    }

    clear() {
        super.clear();
    }

    static json(val) {
        function parse(obj) {
            const map = PbMap();
            for (var key of obj) {
                var val = obj[key];
                map.setSilent(key, typeof val === 'object' ? parse(val) : val);
            }
            return map;
        }
        return parse(JSON.parse(val));
    }
}

class PbSet extends Set {
    constructor(root, iterable) {
        super(iterable);
        this.parent = 'P';
    }

    add(val) {

        super.add(val);
    }

    delete(key) {
        super.delete(key);
    }

    clear() {
        super.clear();
    }
}



//=include elements/base.js
//=include elements/scope.js
//=include elements/bind.js

window.pb = {};
    
}();

