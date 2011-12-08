var ChanMsgView = Backbone.View.extend({
    tagName: "table",
    classname: "log",

    events: {
        "click .sender" : "userInfo",
    },
    initialize: function() {
        // Expects model to be a MessageList
        this.model.bind('add', this.render, this);
    },
    render: function() {
        this.el.appendChild(new MessageView({model: this.model.last()}).el);
    },
    userInfo: function(e) {
        console.log(e);
    }
});
