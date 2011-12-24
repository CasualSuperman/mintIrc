var MessageView = (function() {
    function toNode(msg) {
        var classes = ["message"];
        if (msg.mono) classes.push("mono");
        if (msg.mentioned) classes.push("mentioned");
        var td = _.dom.template("td"),
            el;
        if (msg.user) {
            el = _.dom.create("tr", classes, [
                td("time", msg.time),
                td("sender", (msg.user) ? msg.user.nick : ""),
                td("message", msg.text)
            ]);
        } else {
            classes.push("status");
            var msg = td("message", msg.text);
            msg.colspan = 3;
            el = _.dom.create("tr", classes, msg);
        }
        return el;
    }
    return function(msg) {
        this._msg = msg;
        this.el = toNode(msg);
    };
}());
