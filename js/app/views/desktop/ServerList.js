var ServerListView = Backbone.View.extend({
    tagName: "ul",
    classname: "servers",

    serverList: null,

    initialize: function() {
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
