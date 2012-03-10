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
		this.conns	= (addr) ? {
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

		this.serverNames = {};
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
			name: app.serverNames[info.addr] || getLongestSubstr(info.addr),
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
		app.getServer(info.addr).addMessage(new Message(info));
	});
	irc.on('topic', function(info) {
		var chan = app.getServer(info.addr).getChan(info.chan);
		chan.setTopic(info.topic, info.nick);
	});
	irc.on('quit', function(info) {
		var server = app.getServer(info.addr);
		info.quit = true;
		_.forEach(info.chans, function(chan) {
			server.getChan(chan).addMessage(new Message(info));
		});
	});
	irc.on('part', function(info) {
		var server = app.getServer(info.addr);
		info.part = true;
		if (info.nick === server.nick) {
			server.removeChan(info.chan);
		} else {
			var chan = server.getChan(info.chan);
			chan.addMessage(new Message(info));
		}
	});
	irc.on('names', function(info) {
		var chan = app.getServer(info.addr).getChan(info.chan);
		chan.addUsers(info.names);
	});
	irc.on('disconnect', function() {
		_.emit("disconnected", []);
	});
};

Irc.prototype.join = function(network, chan) {
	this.conns.irc.emit("join", {addr: network, chan: chan});
};

Irc.prototype.connect = function(network, channels, nick) {
	this.conns.irc.emit("connect", {
		addr: network,
		chans: channels || [],
		nick: nick
	});
};

Irc.prototype.serverName = function(addr, name) {
	this.serverNames[addr] = name;
};
