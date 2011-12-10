var ChatView = Backbone.View.extend({
    tagName: "div",
    className: "chat",

    logView: null,
    inputView: null,

    initialize: function() {
        this.render();
    },

    render: function() {
        var container = this.make("div", {class: "container"});
        container.appendChild(this.logView.render().el);
        this.el.appendChild(container);
        this.el.appendChild(inputView.render().el);
        return this;
    }
});
