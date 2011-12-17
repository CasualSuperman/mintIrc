var MessageView = (function() {
    return function(msg) {
        if (arguments.length !== 1) {
            throw "IllegalArgCount";
        }
        this.msg = msg;
        this.toNode();
    };
}());


MessageView.prototype.toNode = function() {
    var el = this.el;
    if (el === undefined) {
        var tr = util.template("tr");
        el = (this.mono) ?                 tr("message status mono") :
             (this.author === undefined) ? tr("message status") :
                                           tr("message");
        var ts = util.template("td");
        var time   = td("time",    this.time);
        var author = td("sender",  this.author);
        var text   = td("message", this.text);

        this.el = el;
    }
    return el;
};
