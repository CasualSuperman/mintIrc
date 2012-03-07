var Message = (function() {
	return function(info) {
		if (info.join) {
			console.log(info.nick + " has joined.");
			this.time = new Date();
			this.serv = info.addr;
			this.text = info.nick + " has joined.";
			this.chan = info.chan;
			this.global = true;
		} else if (info.topic) {
			this.global = true;
			this.text = info.nick + " changed the topic to: " + info.topic;
			this.user = new User(info.nick);
		} else if (info.reason) {
			this.time = new Date();
			this.global = true;
			this.text = info.nick + " has left: " + info.reason;
		} else if (info.msg) {
			if (info.action) {
				this.time = new Date();
				this.serv = info.addr;
				this.chan = info.chan;
				this.text = info.msg;
				this.user = new User(info.nick);
				this.action = true;
			} else if(info.msg.indexOf("\u0001ACTION") === 0) {
				this.time = new Date();
				this.serv = info.addr;
				this.chan = info.chan;
				this.text = info.msg.slice(8);
				this.user = new User(info.nick);
				this.action = true;
			} else {
				this.time = new Date();
				this.serv = info.addr;
				this.text = info.msg;
				this.chan = info.chan;
				this.user = new User(info.nick);
			}
		} else {
			console.log("Unknown type.");
		}
		return this;
	};
}());
