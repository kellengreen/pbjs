class PbAttrs {
    /**
     * 
     */
    constructor(attrs) {
        this.map = new Map(attrs);
    }

    /**
     * 
     */
    validateElem(attrName, oldValue, newValue) {
        const attr = this.map.get(attrName);
        if (attr !== undefined && attr.onChange !== undefined) {
            attr.onChange();
        }
    }

    /**
     * 
     */
    validateAttr(attrName, oldValue, newValue) {
        const attr = this.map.get(attrName);
        if (attr !== undefined && attr.onChange !== undefined) {
            attr.onChange();
        }
    }
}

export default PbAttrs;
