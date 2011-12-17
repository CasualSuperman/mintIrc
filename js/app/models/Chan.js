var Chan = (function() {
    return function(values) {
        this.name = values.name;
        this.topic = values.topic || "";
        this.users = values.users || [];
        this.messages = values.messages || [];
    };
}());

Chan.prototype.addMessage = function(msg) {
    this.addMessages([msg]);
};

Chan.prototype.addMessages = function(msgs) {
    for (var i = 0, len = msgs.length; i < len; ++i) {
        if (msgs[i].constructor.prototype === "Message") {
            this.messages.push(msgs[i]);
        } else {
            this.messages.push(new Message(msgs[i]));
        }
    }
    _(this).emit("add-msgs", [[], msgs]);
};

Chan.prototype.preMessages = function(msgs) {
    for (var i = msgs.length - 1; i >= 0; --i) {
        this.messages.unshift(msgs[i]);
    }
    _(this).emit("add-msgs", [msgs, []]);
}
