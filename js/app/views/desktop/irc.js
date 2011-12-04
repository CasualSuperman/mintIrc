var Irc = Backbone.View.extend({
    id: "irc",
    tagName: "div",

    events: {
        "click #new-conn-btn" : "add",
    },

    // List of active Connections
    conns: new ConnectionViewList,
 
    list: new ConnectionView(this.conns),
    chat: new ChatView(this.conns.find(function(){return this.active})),

    initialize: function() {
        _.bindAll(this, ["render", "add"]);
        this.list.bind("all", this.render);
        this.chat.bind("all", this.render);

    },

    add: function() {

    },

    render: function() {
        var style = this.el.style.display;
        this.el.style.display = "none";
        while(this.el.hasChildNodes()) this.el.removeChild(this.el.children[0]);

        // Header
        var head = this.list.render().el;

        // Chat
        var chat = this.chat.render().el;
            chat.style.top = this.list.el.offsetHeight + "px";

        // Talk Bar
        var talk = document.getElementById("talk") || this.make("input", {id: "talk"});
            chat.style.bottom = this.talk.el.offsetHeight + "px";

        // Attach them
        this.el.appendChild(head);
        this.el.appendChild(chat);
        this.el.appendChild(talk);

        this.el.style.display = style;
        return this;
    }
});
