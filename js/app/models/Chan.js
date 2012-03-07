var Chan = (function() {
	return function(values) {
		this.name = values.name;
		this.topic = values.topic || "";
		this.users = values.users || {};
		this.messages = values.messages || [];
	};
}());

Chan.prototype.addMessage = function(msg) {
	this.addMessages([msg]);
};

Chan.prototype.addMessages = function(msgs) {
	var context = this;
	_(msgs).each(function(msg) {
		if (msg.user) {
			msg.user.prefix = this.users[msg.user.nick];
		}
		this.messages.push(msg);
	}, this);
	_(this).emit("new-msgs", [[], msgs]);
};

Chan.prototype.preMessages = function(msgs) {
	_(msgs).each(function(msg) {
		this.messages.unshift(msg);
	}, this);
	_(this).emit("new-msgs", [msgs, []]);
};

Chan.prototype.setTopic = function(str, setBy) {
	this.topic = {
		str: str,
		nick: setBy
	};
	_(this).emit("new-topic");
};

Chan.prototype.addUsers = function(users) {
	var context = this;
	_(users).forEach(function(mods, user) {
		context.users[user] = mods;
	});
};
