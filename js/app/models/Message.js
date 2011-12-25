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
            }()),
            "JOIN": (function() {
                var user = /^([^!]+)(?:!([^@]+))?@(.+)$/,
                    chan = /^:(.+)$/;
                return function(match) {
                    var from = match[1].match(user);
                    //this.user = new User(from[1], from[2], from[3]);
                    this.chan = match[3].match(chan)[1];
                    this.serv = from[3];
                    this.text = from[1] + " has joined.";
                }
            }()),
            "372": (function() {
                return function(match) {
                    this.global = true;
                    this.mono   = true;
                    this.text = match[3].split(":").slice(1).join(":");
                    this.user = {};
                }
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
                if (!window.actions) {
                    window.actions = {};
                }
                if (window.actions[this.action])
                    window.actions[this.action] = window.actions[this.action] + 1;
                else 
                    window.actions[this.action] = 1;
                console.log("Unknown action", match, str);
            } else {
                actions[this.action].call(this, match);
            }
        }
    };
}());
