var Irc = Backbone.View.extend({
    tagName: "body",
    classname: "",

    serverList: new ServerList,
    serverViewList: new (Backbone.Collection.extend({
        model: ServerView
    }))(),

    ActiveServer: null,

    initialize: function(args) {
        this.serverList = args.serverList;
        this.serverList.forEach(function(elem) {
            console.log(this);
            console.log(this.serverViewList);
            this.serverViewList.add(
                new ServerView({model: elem})
            );
        }, this);
        console.log(this.serverViewList);
        this.serverViewList.first().active = true;
        this.ActiveServer = this.serverViewList.first();
        this.render();
    },

    render: function() {
        _.each(this.serverViewList, function(view) {
            if (view.active) {
                this.ActiveServer = view;
            }
        }, this);
        // Hide node to prevent reflow.
        this.el.style.display = "none";
        // Remove all children.
        while (this.el.hasChildNodes())
            this.el.removeChild(this.el.lastChild);

        // Add the active views.
        var header = document.createElement("header");
        header.className = "connection-list";

        // Add the servers
        var servers = document.createElement("ul");
        servers.className = "servers";
        _.each(this.serverViewList, function(elem) {
            servers.appendChild(elem.NameElement);
        }, this);
        servers.appendChild(document.createElement("li"));
        servers.lastChild.className = "server nonitem";
        servers.lastChild.appendChild(document.createTextNode("+"));

        // Add the servers
        header.appendChild(servers);

        // List of chans
        var chans = document.createElement("ul");
        chans.className = "chans";
        _.each(this.ActiveServer.ChanView, function(elem) {
            chans.appendChild(elem.NameElement);
        }, this);
        chans.appendChild(document.createElement("li"));
        chans.lastChild.className = "server nonitem";
        chans.lastChild.appendChild(document.createTextNode("+"));

        // Add the chans
        header.appendChild(chans);

        // Add the gradient
        header.appendChild(this.make("div", {class: "gradient"}));

        var chat = document.createElement("div");
        chat.className = "chat";

        var container = document.createElement("div");
        container.className = "container";
        container.appendChild(this.ActiveServer.ActiveChan.Messages);
        chat.appendChild(container);
        chat.appendChild(document.createElement("input"));

        this.el.appendChild(chat);

        // Restore the node.
        this.el.style.display = "";

        return this;
    },
});
