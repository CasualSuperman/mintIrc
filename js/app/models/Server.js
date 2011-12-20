var Server = (function() {
    return function(values) {
        var serv = {
            name: values.name,
            addr: values.addr,
            nick: values.nick,
            nickReg: new RegExp("\\b" + values.nick + "\\b", "i"),
            chans: values.chans || [],
            users: values.users || [],
            main: values.main || new Chan
        };
        return ret;
    }
}());

Server.prototype.addMessage = function(msg) {
    this.addMessages([msg]);
};

Server.prototype.addMessages = function(msgs) {
    _(msgs).each(function(msg) {
        if (msg instanceof Message) {
            var chan = _(this.chans).find(function(chan) {
                return chan.name === msg.chan;
            });
            chan.addMessage(msg);
            if (this.nickReg.text(msg.text)) {
                _(chan).emit("mentioned");
            }
        }
    }, this);
}
