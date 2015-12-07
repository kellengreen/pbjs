pb.PbBind = class extends pb.PbBase {

    constructor(elem) {
        super(elem);
        this.provider = null;
    }

    attached() {
        this.setProvider();
        super.attached();
    }

    detached() {
        this.provider = null;
        this.elem.textContent = null;
    }

    draw(val) {
        this.elem.textContent = val;
    }

    setProvider() {
        var elem = this.elem.parentNode;
        while (elem) {
            var pbe = elem[pb.symbol];
            if (pbe instanceof $.PbScope) {
                this.provider = elem[$.symbol];
                break;
            }
            parent = parent.parentNode;
        }
        this.error('No parent scope found in DOM');
    }

    pgIdChanged(key) {
        var val = this.provider.data[key];
        if (val === undefined) {
            this.error('Unable to get property from parent scope');
        }
        this.draw(val);
    }
};

pb.PbBind.Element = HTMLElement;
pb.PbBind.tagName = 'pb-bind';
pb.register(pb.PbBind);
