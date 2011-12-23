var MessageView = (function() {
    function toNode(msg) {
        var classes = ["message"];
        if (msg.mono) classes.push("mono");
        if (msg.mentioned) classes.push("mentioned");
        if (!msg.user) classes.push("status");
        var td = _.dom.template("td");
        var el = _.dom.create("tr", classes, [
            td("time", msg.time),
            td("sender", msg.user.nick),
            td("message", msg.text)
        ]);
        return el;
    }
    return function(msg) {
        this._msg = msg;
        this.el = toNode(msg);
    };
}());
