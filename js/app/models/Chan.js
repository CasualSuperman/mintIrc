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
    _(msgs).each(function(msg) {
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

Chan.prototype.setTopic = function(str) {
    this.topic = str;
    _(this).emit("new-topic");
}
