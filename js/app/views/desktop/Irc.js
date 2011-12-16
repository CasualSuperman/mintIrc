var Irc = Backbone.View.extend({
    tagName: "body",
    classname: "",

    serverList: new ServerList,
    serverViewList: [],

    ActiveServer: null;

    initialize: function() {
        this.serverList.forEach(function(elem) {
            this.serverViewList.push(new ServerView({model: elem}));
        }, this);
        this.render();
    },

    render: function() {
        this.el = this.make(this.tagName, {class: this.className});

        _.each(serverViewList, function(view) {
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
        var header = this.make("header", {class: "connection-list"});
        // Add the servers
        var servers = this.make("ul", {class: "servers"});
        _.each(serverViewList, function(elem) {
            servers.appendChild(elem.NameElement);
        }, this);
        servers.appendChild(this.make("li", {class: "server nonitem"}, "+"));
        // Add the servers
        header.appendChild(servers);
        // List of chans
        var chans = this.make("ul", {class: "chans"});
        _.each(ActiveServer.ChanView, function(elem) {
            chans.appendChild(elem.NameElement);
        }, this);
        chans.appendChild(this.make("li", {class: "chan nonitem"}, "+"));
        // Add the chans
        header.appendChild(chans);
        // Add the gradient
        header.appendChild(this.make("div", {class: "gradient"}));

        var chat = this.make("div", {class: "chat"});
        var container = this.make("div", {class: "container"});
        container.appendChild(ActiveServer.ActiveChan.Messages);
        chat.appendChild(container);
        chat.appendChild(this.make("input", {class: "chat"}));

        this.el.appendChild(chat);

        // Restore the node.
        this.el.style.display = "";

        return this;
    },
});
