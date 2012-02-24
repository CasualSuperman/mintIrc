var MessageView = Backbone.View.extend({
    tagName: "tr",
    className: "message",

    template: _.template("<td class='sender'><%-sender%></td><td class='message'><%-text%></td>"),

    initialize: function() {
        this.render();
    },

    render: function() {
        if (this.model.sender === null) {
            this.el.className = "message status";
            if (this.model.mono) {
                this.el.className += " mono";
            }
        }
        this.el.innerHTML = this.template({
            text: this.model.text,
            sender: this.model.sender
        });
        return this;
    }
});
