var Message = (function() {
    var reg = /:([^ ]+) ([^ ]+) ?(.+)?$/,
    //         :server   action  extra
        actions = {
            "PRIVMSG": (function() {
                var info = /^(.*) :(.*)$/,
                    user = /^([^!]+)(?:!([^@]+))?@(.+)$/;
                return function(match) {
                    var extra = match[3].match(info);
                    if (extra !== null) {
                        var from = match[1].match(user);
                        if (!from) {
                            console.log("Unable to parse user.", this.serv);
                        } else {
                            this.user = new User(from[1], from[2], from[3]);
                            this.serv = from[3];
                        }
                        this.chan = extra[1];
                        this.text = extra[2];
                    } else {
                        console.log("Unable to parse as PRIVMSG", match.input);
                    }
                };
            }())
        };
    return function(str) {
        var match = str.match(reg);
        if (match !== null) {
            this.time = new Date();
            this.serv = match[1];
            this.action = match[2];
            var extra = match[3];
            if (!actions[this.action]) {
                console.log("Unknown action", ret.action, str);
            } else {
                actions[this.action].call(this, match);
            }
        }
    };
}());
