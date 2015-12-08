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
