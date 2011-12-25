var MessageView = (function() {
    function toNode(msg) {
        var classes = ["message"];
        if (msg.mono) classes.push("mono");
        if (msg.mentioned) classes.push("mentioned");
        var td = _.dom.template("td"),
            el;
        if (msg.global) {
            classes.push("status");
            var temp = td("sender");
            temp.colSpan = 2;
            el = _.dom.create("tr", classes, [
                temp,
                td("message", msg.text)
            ]);
        } else {
            if (msg.user) {
                el = _.dom.create("tr", classes, [
                    td("time", msg.time.toLocaleTimeString()),
                    td("sender", (msg.user) ? msg.user.nick : ""),
                    td("message", msg.text)
                ]);
            } else {
                classes.push("status");
                var temp = td("sender", "User");
                temp.innerHTML += "&nbsp;";
                el = _.dom.create("tr", classes, [
                    td("time"),
                    temp,
                    td("message", msg.text)
                ]);
            }
        }
        return el;
    }
    return function(msg) {
        this._msg = msg;
        this.el = toNode(msg);
    };
}());
