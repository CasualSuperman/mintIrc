var ConnectionListView = Backbone.View.extend({
    tagName: "ul",
    className: "connList",

    events: {
        "click .network"      : "makeactive"
    },

    initialize: function() {
//        _.bindAll(this, "render", "add");
        this.connections = new ConnectionList;
        this.connections.bind("all", this.render);
    },


    makeactive: function(e) {
        console.log(e.target);
    },

    render: function() {
        _.each(this.connections, function(conn) {
            alert(this);
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(conn.name));
            if (conn.active) {
                li.className = "active";
            } else if (conn.mention) {
                li.className = "mention";
            }
            this.el.appendChild(li);
        }, this);

        var addButton = document.createElement("li");
        addButton.id = "new-conn-btn";
        addButton.appendChild(document.createTextNode("+"));
        addButton.className = "nonitem";
        this.el.appendChild(addButton);

        return this;
    }
});
