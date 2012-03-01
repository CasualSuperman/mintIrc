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

		this.getChan = function(info) {
			var chan = _.filter(this.chans, function(chan) {
				return chan.name === info;
			});
			if (chan.length > 0)
				return chan[0];
		};

		this.newChan = function(info) {
			if (!_(this.chans).any(function(chan) {
				return chan.name === info.name;
			})) {
				var chan = new Chan(info);
				this.chans.push(chan);
				_(this).emit("new-chan", [chan]);
				return chan;
			}
		};

		this.removeChan = function(name) {
			var _chans = _(this.chans);
			var chans = _chans.filter(function(chan) {
				return chan.name === name;
			});
			if (chans.length > 0) {
				var chan = chans[0];
				_(chan).emit('removed');
				this.chans = _chans.filter(function(chan) {
					chan.name !== name;
				});
			}
		};
    }
}());

Server.prototype.addMessage = function(msg) {
    this.addMessages([msg]);
};

Server.prototype.addMessages = function(msgs) {
    _(msgs).each(function(msg) {
        if (msg.global) {
            this.main.addMessage(msg);
        } else {
            if (msg instanceof Message) {
                var chan = _(this.chans).find(function(chan) {
                    return chan.name === msg.chan;
                });
                if (this._nick.test(msg.text)) {
                    _(chan).emit("mentioned");
                    _(this).emit("mentioned");
                    msg.mentioned = true;
                    var texts = msg.text.split(this._nick),
                        list  = [],
                        templ = _.dom.template("span", "mention", this.nick);
                    _.each(texts, function(text) {
                        list.push(document.createTextNode(text));
                        list.push(templ());
                    });
                    list.pop();
                    msg.text = list;
                }
                if (chan)
                    chan.addMessage(msg);
            } else {
                return "Not a message.";
            }
        }
    }, this);
};

