var MessageView = (function() {
    return function(msg) {
        if (arguments.length !== 1) {
            throw "IllegalArgCount";
        }
        this.msg = msg;
        this.el = this._toNode();
    };
}());


MessageView.prototype._toNode = function() {
    var el = this.el;
    if (el !== undefined) {
        util.clear(el);
    } else {
        var tr = util.template("tr");
        el = (this.msg.mono) ?                 tr("message status mono") :
             (this.msg.author === undefined) ? tr("message status") :
                                               tr("message");
        var td = util.template("td");
        var time   = td("time",    this.msg.time);
        var author = td("sender",  this.msg.author);
        var text   = td("message", this.msg.text);

        this.el = el;
    }
    return el;
};
