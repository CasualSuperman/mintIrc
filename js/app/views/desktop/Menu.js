var MenuView = Backbone.View.extend({
    tagName: "header",
    className: "connection-list",

    serverListView: null,
    chanListView: null,

    initialize: function() {
        this.el.appendChild(serverListView.el);
        this.el.appendChild(chanListView.el);
        this.render();
    },

    render: function() {
        serverListView.render();
        chanListView.render();
        return this;
    }
});
