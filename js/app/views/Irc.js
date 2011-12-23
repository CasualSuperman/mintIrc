var IrcView = (function() {
    var dom = _.dom,
        append = _.dom.append;
    function setup(obj) {
        var elements = {
                body: document.body,
                modChan: new ModalChanWindow(), //dom.create("div", ["modal", "newChan"]),
                modServ: new ModalServWindow(), //dom.create("div", ["modal", "newServ"]),
                servList: dom.create("ul", ["servs"]),
                newServ: dom.create("span", ["serv", "nonitem"], "+"),
                newChan: dom.create("span", ["chan", "nonitem"], "+"),
                header: dom.create("header", ["connection-list"]),
                input: dom.create("input", ["chat"])
        };
        obj.el = elements;

        // View for 0 servers.
        obj._defaultServ = new DefaultServerView();
        var serverViews = _.map(irc.servers, function(serv) {
            return new ServerView(serv);
        });

        // Activate first server.
        if (serverViews.length > 0) {
            serverViews[0].activate();
        }
        // Set up chan menu
        _.each(serverViews, function(servView) {
            append(elements.servList, servView.el.li);
        });
        // Make globally accessible.
        obj._serverViews = serverViews;

        /* Dom Events. */
        elements.newServ.onclick = function() {
            append(elements.body, elements.modServ.el);
        };
        elements.newChan.onclick = function() {
            append(elements.body, elements.modChan.el);
        };

        /* Dom Structure. */
        var activeServer = this.getActiveServerView();
        elements.chanList = activeServer.el.chans;

        append(elements.header, [
            elements.servList,
            elements.newServ,
            elements.chanList,
            elements.newChan
        ]);
        append(elements.body, elements.header);
        append(elements.body, activeServer.getActiveChanView().el.messages);
        append(elements.body, elements.input);

    }
    return function(irc) {
        setup(this);

        /* Global event handling. */
        _.on("new-active-chan", _.bind(function(chanView) {
            var oldView = this.getActiveServerView().getActiveChanView();
            oldView.deactivate();
            newView.activate();
            elements.body.replaceChild(old.el.messages, view.el.messages);
        }, this));

        _.on("new-active-serv", _.bind(function(servView) {
            var oldView = this.getActiveServerView();
            oldView.deactivate();
            newView.activate();
            var oldChan = oldView.getActiveChanView();
            var newChan = newView.getActiveChanView();
            elements.body.replaceChild(oldChan.el.messages, newChan.el.messages);
        }, this));

        /* Local event handling. */
        _(irc).on("new-server", _.bind(function(server) {
            var view = new ServerView(server);
            if (serverViews.length > 0) {
                var index = _.indexBy(serverViews, function(serv) {
                    return serv.active === true;
                });
            } else {
                serverViews.push(view);
                append(elements.servList, view.el.li);
                _.emit("new-active-serv", [view]);
            }
        }, this));
    };
}());

IrcView.prototype.getActiveServerView = function() {
    var active = _.find(this._serverViews, function(serv) {
        return serv.active;
    });
    return active ? active : this._defaultServ;
};
