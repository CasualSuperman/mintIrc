var Irc = Backbone.View.extend({
    tagName: "body",
    classname: "",

    serverList: null,

    initialize: function() {
        this.el.appendChild(new MenuView({}));
        this.render();
    },

    render: function() {
        this.el = this.make(this.tagName, {class: this.className});
        serverList.forEach(function(elem) {
            this.el.appendChild(new ServerListItemView({model: elem}).render().el);
        }, this);
        return this;
    },
});
