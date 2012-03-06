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
			this.time = new Date();
			this.serv = info.addr;
			this.text = info.msg;
			this.chan = info.chan;
			this.user = new User(info.nick);
		} else {
			console.log("Unknown type.");
			debugger;
		}
		return this;
    };
}());
