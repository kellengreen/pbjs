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