var ChanListItemView = Backbone.View.extend({
    tagName: "li",
    className: "chan",

    initialize: function() {
        this.render();
    },

    render: function() {
        if (this.mode.active) {
            this.el.className = "chan active";
        }
        this.el.innerHTML = _.escape(this.model.name);
        return this;
    }
});
