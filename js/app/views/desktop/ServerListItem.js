var ServerListItemView = Backbone.View.extend({
    tagName: "li",
    className: "server",

    initialize: function() {
        this.render();
    },

    render: function() {
        if (this.mode.active) {
            this.el.className = "server active";
        }
        this.el.innerHTML = _.escape(this.model.name);
        return this;
    }
});
