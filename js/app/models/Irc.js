var Irc = (function() {
    return function(addr) {
		var dom = _.dom;
		var elements = {
			body: document.body,
			newChan: (function() {
				var div = dom.create("div", "modal");
				div.id = "chan_modal";
				return div;
			}()),
			newServ: (function() {
				var div = dom.create("div", "modal");
				div.id = "serv_modal";
				return div;
			}())
		};
        this.servers = [];
        this.conns    = (addr) ? {
			mintI: io.connect(addr + "/mintI"),
			irc:   io.connect(addr + "/irc") 	
		}: {};
        this.handle();
        this.el = elements;

		this.addServer = function(serv) {
		    var exists = _.find(this.servers, function(server) {
		        return server.addr === serv.addr;
		    });
		    if (!exists) {
		        this.servers.push(serv);
		        _(this).emit("new-server", [serv])
		    }
		};

		this.getServer = function(serv) {
			var serv = _.filter(this.servers, function(server) {
				return server.addr === serv;
			});
			if (serv.length > 0) {
				return serv[0];
			}
		};
    }
}());

function getLongestSubstr(string) {
	var i = 0;
	var longest = "";
	var current = "";
	while (i < string.length) {
		current = "";
		while (i < string.length && string[i] !== '.') {
			current += string[i];
			i++;
		}
		if (current.length > longest.length) {
			longest = current;
		}
		while (i < string.length && string[i] === '.') {
			i++;
		}
	}
	return longest;
}

Irc.prototype.handle = function() {
	var app = this;
	var irc = this.conns.irc;
	irc.on('registered', function (info) {
		app.addServer(new Server({
			name: getLongestSubstr(info.addr),
			addr: info.addr,
			nick: info.nick,
		}));
	});
	irc.on('join', function(info) {
		var serv = app.getServer(info.addr);
		var chan = serv.getChan(info.chan);
		if (!chan) {
			chan = serv.newChan({name: info.chan});
		}
		info.join = true;
		chan.addMessage(new Message(info));
	});
	irc.on('message', function(info) {
		console.log("Message received.");
		app.getServer(info.addr).getChan(info.chan)
			.addMessage(new Message(info));
	});
	irc.on('topic', function(info) {
		var chan = app.getServer(info.addr).getChan(info.chan);
		chan.setTopic(info.topic);
		chan.addMessage(new Message(info));
	});
	irc.on('part', function(info) {
		var server = app.getServer(info.addr);
		if (info.nick === server.nick) {
			server.removeChan(info.chan);
		} else {
			var chan = server.getChan(info.chan);
			chan.addMessage(new Message(info));
		}
	});
	for (var conn in this.conns) {
		var _conn  = _(this.conns[conn]),
	    	context = this;
		_conn.on("open", function(e) {
		    console.log("Connection open!");
		});
		_conn.on("close", function(e) {
		    console.log("Connection closed.");
		});
		_conn.on("message", function(info) {
			console.log(info);
		    var serv = _.find(context.servers, function(serv) {
		        return serv.addr === info.addr;
		    });
		    if (serv) {
		        serv.addMessage(info.msg);
		    } else {
		        console.log("Data sent with server " + info.Server + ", but no such server found.");
		    }
		});
		_conn.on("error", function(e) {
		    console.log("Connection error: ", e);
		});
	}
}
