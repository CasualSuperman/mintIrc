var ServerView = (function() {
    function setup(obj, serv) {
        var dom = _.dom;
        var elements = {
            // Menu item
            li: dom.create("li", ["serv"], serv.name),
            // Chan list
            chans: dom.create("ul", ["chans"])
        };
        obj.main = new MainChanView(serv.main);

        // Get our list of chanviews.
        var chanViews = _.map(serv.chans, function(chan) {
            return new ChanView(chan);
        });
        obj._chanViews = chanViews;

        // Add the channels to the channel list.
        _.each(chanViews, function(chan) {
            elements.chans.appendChild(chan.el.li);
        });

        if (chanViews.length > 0) {
            chanViews[0].activate();
        }

        elements.li.onclick = function() {
            if (obj.active) {
                // Display our "hidden" channel.
                _.emit("new-active-chan", [obj.main]);
            } else {
                // Make us active.
                _.emit("new-active-serv", [obj]);
            }
        };
        obj.el = elements;
    }
    return function(serv) {
        setup(this, serv);
        var chanViews = this._chanViews,
            elements  = this.el;
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
                elements.chans.prependChild(view.el.li);
                _.emit("new-active-chan", [view]);
            }
        });
    }
}());

ServerView.prototype.getActiveChanView = function() {
    var active = _(this._chanViews).find(function(chan) {
        return chan.active;
    });
    return active ? active : this.main;
};

ServerView.prototype.activate = function() {
    _.dom.addClass(this.el.li, "is-active");
    this.active = true;
    this.unmentioned();
};

ServerView.prototype.deactivate = function() {
    _.dom.removeClass(this.el.li, "is-active");
    this.active = false;
};

ServerView.prototype.mentioned = function() {
    _.dom.addClass(this.el.li, "is-interesting");
    this.mentioned = true;
};

ServerView.prototype.unmentioned = function() {
    if (this.mentioned) {
        this.mentioned = false;
        _.dom.removeClass(this.el.li, "is-interesting");
    }
};
