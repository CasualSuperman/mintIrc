var ServerView = function(serv) {
    var dom = _.dom;
    var elements = {
        // Menu item
        li: dom.create("li", ["serv"], serv.name),
        // Chan list
        chans: dom.create("ul", ["chans"]),
    };
    this.main = new MainChanView(serv.main);

    // Get our list of chanviews.
    var chanViews = _.map(serv.chans, function(chan) {
        return new ChanView(chan);
    });

    // Add the chans to our menu.
    _.each(chanViews, function(chan) {
        elements.chans.appendChild(chan.el.li);
    });

    if (chanViews.length > 0) {
        if (this.active) {
            _.emit("new-active-chan", chanViews[0]);
        }
    }

    // Handle new channels.
    _(serv).on("new-chan", function(chan) {
        var view = new ChanView(chan);
        if (chanViews.length > 0) { 
            // Open just after the active channel.
            var index = _.indexBy(chanViews, function(view) {
                return view.active;
            });
            chanViews.splice(index + 1, 0, view);
            elements.chans.insertBefore(view.el.li, elements.chans.childNodes[index].nextSibling);
        } else {
            // Only channel.
            chanViews.push(view);
            dom.append(elements.chans, view.el.li);
        }
    });
    this.el = elements;
    this._chanViews = chanViews;
}

ServerView.prototype.getActiveChanView = function() {
    var active = _(this._chanViews).find(function(chan) {
        return chan.active;
    });
    return active ? active : this.main;
}
ServerView.prototype.activate = function() {
    _.dom.addClass(this.el.li, "is-active");
    this.active = true;
    this.unmentioned();
};

ServerView.prototype.deactivate = function() {
    _.dom.removeClass(this.ls.li, "is-active");
    this.active = false;
}

ServerView.prototype.mentioned = function() {
    dom.addClass(el.li, "is-mentioned");
    context.mentioned = true;
}

ServerView.prototype.unmentioned = function() {
    if (this.mentioned) {
        _(this).emit("unmentioned");
        this.mentioned = false;
        _.dom.removeClass(this.el.li, "is-mentioned");
    }
}
