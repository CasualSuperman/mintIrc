var MessageView = function(msg) {
    if (arguments.length !== 1) {
        throw "IllegalArgCount";
    }
    this.msg = msg;
    this.el = this._toNode();
};

MessageView.prototype._toNode = function() {
    var el  = this.el,
        dom = _.dom,
        msg = this.msg;
    if (el !== undefined) {
        dom.clear(el);
    } else {
        var tr = dom.template("tr");
        var classes = ["message"];
        if (msg.mono) {
            classes.push("mono");
        }
        if (msg.mentioned) {
            classes.push("mention");
        }
        if (msg.user === undefined) {
            classes.push("status");
        }
        el = tr(classes);
        var td = dom.template("td");
        var time   = td("time",    msg.time);
        var author = td("sender",  msg.user.nick);
        var text   = td("message", msg.text);

        _.each([time, author, text], function(elem) {
            dom.append(el, elem);
        });
        this.el = el;
    }
    return el;
};
