function PbCsv(elem) {
    PbBind(this, elem);
}

PbCsv.prototype = Object.create(PbBind.prototype);
PbCsv.prototype.constructor = PbCsv;

PbCsv.tagName = 'pb-csv';

PbCsv.prototype.clean = function(val) {
    return val.split(', ');
};

pb.register(PbCsv);