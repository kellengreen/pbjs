pb.PbScope = class extends pb.PbBase {

    constructor(elem) {
        super(elem);

    }

    attached() {
        this.setDependants();
        super.attached();
    }

    detached() {

        // update dependants
        this.dependants.forEach(function(pbe) {
            pbe.setProvider();
        }, pbe);

        // update self
        this.provider = null;
        this.dependants.clear();

        super.detached();
    }

    setDependants() {
        var elems = this.elem.querySelectorAll(pb.PbScope.tagName);
        for (var i = 0, child; child = elems[i]; i++) {
            if (child[pb.symbol] instanceof pb.PbScope) {
                this.dependants.add(child[pb.symbol]);
            }
        }
    }

    pbIdChanged(val) {
        var fn = window[val];
        if (typeof fn === 'function') {
            this.error('Unable to initialize scope', val);
        }
        fn(this.data);
    }

};

pb.PbScope.Element = HTMLElement;
pb.PbScope.tagName = 'pb-scope';
pb.register(pb.PbScope);
