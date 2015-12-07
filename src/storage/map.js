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