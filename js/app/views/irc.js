var Irc = Backbone.View.extend({
    id: "irc",
    tagName: "div",

    connections: new ConnectionListView,

    initialize: function() {
        _.bindAll(this, "render", "add");
        this.connections.bind("all", this.render);
    },
});
