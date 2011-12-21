var Server = (function() {
    return function(values) {
        var _nickReg = new RegExp("\\b" + values.nick + "\\b", "i");
        this.name = values.name;
        this.addr = values.addr;
        this.nick = values.nick;
        this._nick = _nickReg;
        this.chans = values.chans || [];
        this.users = values.users || [];
        this.main = values.main || new Chan({})
    }
}());

Server.prototype.addMessage = function(msg) {
    this.addMessages([msg]);
};

Server.prototype.addMessages = function(msgs) {
    _(msgs).each(function(msg) {
        if (msg instanceof Message) {
            console.log("Looking for chan", msg.chan);
            var chan = _(this.chans).find(function(chan) {
                return chan.name === msg.chan;
            });
            chan.addMessage(msg);
            if (this._nick.test(msg.text)) {
                _(chan).emit("mentioned");
            }
        } else {
            return "Not a message.";
        }
    }, this);
};

Server.prototype.newChan = function(info) {
    if (!_(this.chans).any(function(chan) {
        return chan.name === info.name;
    })) {
        var chan = new Chan(info);
        this.chans.push(chan);
        _(this).emit("new-chan", [chan]);
        return chan;
    }
};
