var LogView = Backbone.View.extend({
    tagName: "table",
    className: "log",

    msgList: null,

    initialize: function() {
        this.render();
    },

    render: function() {
        msgList.forEach(function(elem) {
            this.el.appendChild(new MessageView({model: elem}).render().el);
        }, this);
        return this;
    }
});
