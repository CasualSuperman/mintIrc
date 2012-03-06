var MessageView = (function() {
	var url = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
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
				var text = msg.text;
                var message = td("message", text);
				message.innerHTML =
					message.innerHTML.replace(url, "<a href='$&'>$&</a>");
                el = _.dom.create("tr", classes, [
                    td("time", msg.time.toLocaleTimeString()),
                    td("sender", (msg.user) ? msg.user.nick : ""),
					message
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
