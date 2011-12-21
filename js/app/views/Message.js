var MessageView = function(msg) {
    if (arguments.length !== 1) {
        throw "IllegalArgCount";
    }
    this.msg = msg;
    this.el = this._toNode();
};

MessageView.prototype._toNode = function() {
    var el  = this.el,
        dom = _.dom;
    if (el !== undefined) {
        dom.clear(el);
    } else {
        var tr = dom.template("tr");
        var classes = ["message"];
        if (this.msg.mono) {
            classes.push("mono");
        }
        if (this.msg.author === undefined) {
            classes.push("status");
        }
        el = tr(classes);
        var td = dom.template("td");
        var time   = td("time",    this.msg.time);
        var author = td("sender",  this.msg.author);
        var text   = td("message", this.msg.text);

        _.each([time, author, text], function(elem) {
            dom.append(el, elem);
        });
        this.el = el;
    }
    return el;
};
