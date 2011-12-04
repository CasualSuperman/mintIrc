var ConnectionListView = Backbone.View.extend({
    tagName: "ul",
    className: "connList",

    connections: new ConnectionList,
    events {
        "click #new-conn-btn" : "add",
        "click .network"      : "makeactive"
    },

    makeactive: function(e) {
        console.log(e.target);
    }
});
