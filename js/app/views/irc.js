var Irc = Backbone.View.extend({
    id: "irc",
    tagName: "div",

    events: {
        "click #new-conn-btn" : "add",
    },

    chat: new ConnectionView,

    initialize: function() {
        _.bindAll(this, "render", "add");
        this.chat.bind("all", this.render);
    },

    add: function() {

    },

    render: function() {
        var style = this.el.style.display;
        this.el.style.display = "none";
        while(this.el.hasChildNodes()) this.el.removeChild(this.el.children[0]);
        this.el.appendChild(this.chat.render().el);
        this.el.style.display = style;
        return this;
    }
});
