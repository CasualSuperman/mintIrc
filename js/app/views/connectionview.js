var ConnectionView = Backbone.View.extend({
    tagName: "header",

    conns: new ConnectionList,

    initialize: function() {
        _.bindAll(this, "render", "add");
        this.conns.bind("all", this.render);
    },

    add: function() {

    },

    render: function() {
        this.el = this.make(this.tagName);
        this.el.appendChild(this.renderList());
        this.el.appendChild(this.renderActiveList());
        this.el.appendChild(this.make("div", {id: "gradient"}));
        return this;
    },
    
    renderList: function() {
        var ul = this.make("ul", {className: "connList"});
        this.conns.forEach(function(conn) {
            var li = this.make("li", {}, conn.name);
            if (conn.active) {
                li.className = "active";
            } else if (conn.mention) {
                li.className = "mention";
            }
            ul.appendChild(li);
        }, this);
        
        var addButton = this.make("li", {
            class: "nonitem",
            id: "new-conn-btn"
        }, "+");
        ul.appendChild(addButton);
        
        return ul;
    },

    renderActiveList: function() {
        var ul = this.make("ul", {class: "roomList"});

        var active = this.conns.find(function(conn) {
                return conn.active;
        });

        if (active)
        active.rooms.forEach(function(room) {
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(room.name));
                if (room.active) {
                    li.className = "active";
                } else if (room.mention) {
                    li.className = "mention";
                }
                ul.appendChild(li);
        });
        
        var addButton = this.make("li", {
            class: "nonitem",
            id: "new-room-btn"
        }, "+");
        ul.appendChild(addButton);

        return ul;
    }
});
