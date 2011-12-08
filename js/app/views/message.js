var MessageView = Backbone.View.extend({
    tagName: "tr",
    className: "message",

    template: _.template("<td class='sender'><%-sender%></td><td class='message'><%-text%></td>"),

    events: {
        "click .sender" : "userInfo",
    },

    render: function() {
        if (this.model.sender === null) {
            this.el.className = "message status";
        }
        this.el.innerHTML = this.template({
            text: this.model.text,
            sender: this.model.sender
        });
    }
});
