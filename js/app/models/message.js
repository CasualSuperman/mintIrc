var Message = (function() {
    return function(values) {
        this.time   = values["time"];
        this.author = values["author"];
        this.text   = values["text"];
        this.mono   = values["mono"];
    };
}());

Message.prototype.toNode = function() {
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
