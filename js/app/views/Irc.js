var IrcView = (function() {
    return function(irc) {
        var dom = _.dom,
            append = _.dom.append;
        var elements = {
            body: document.body,
            modChan: dom.create("div", ["modal", "newChan"]),
            modServ: dom.create("div", ["modal", "newServ"]),
            servList: dom.create("ul", ["servs"]),
            newServ: dom.create("span", ["serv", "nonitem"], "+"),
            newChan: dom.create("span", ["chan", "nonitem"], "+"),
            header: dom.create("header", ["connection-list"])
        };
        dom.clear(elements.body);
        this._defaultServ = new DefaultView();
        
        var serverViews = this._serverViews = _.map(irc.servers, function(serv) {
            return new ServerView(serv);
        });

        _.each(serverViews, function(servView) {
            append(servList, servView.el.li);
        });
        if (serverViews.length > 0) {
            serverViews[0] = active;
        }
        var activeServer = this.getActiveServerView();
        elements.chanList = activeServer.el.chans;

        append(elements.header, [
            elements.servList,
            elements.newServ,
            elements.chanList,
            elements.newChan
        ]);
        append(elements.body, elements.header);
        append(elements.body, activeServer.getActiveMessageElement());
    };
}());

IrcView.prototype.getActiveServerView = function() {
    var active = _.find(this._serverViews, function(serv) {
        return serv.active;
    });
    return active ? active : this._defaultServ;
};
