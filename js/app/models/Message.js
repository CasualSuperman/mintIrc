var Message = (function() {
    var reg = /:([^ ]+) ([^ ]+) ?(.+)?$/,
    //         :server   action    extra
        actions = {
            "PRIVMSG": (function() {
                var info = /^(.*) :(.*)$/,
                    user = /^([^!]+)!([^@]+)@(.+)$/;
                return function(match) {
                    var extra = match[3].match(reg);
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
        var match = str.match(reg),
            ret   = {};
        if (match !== null) {
            ret.time = new Date();
            ret.serv = match[1];
            ret.action = match[2];
            var extra = match[3];
            if (!actions[ret.action]) {
                console.log("Unknown action", ret.action, str);
            } else {
                actions[ret.action].call(ret, match);
            }
        }
        return ret;
    };
}());
