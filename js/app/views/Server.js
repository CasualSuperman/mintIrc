var ServerView = function(serv) {
    var dom = _.dom;
    var elements = {
        // Menu item
        li: dom.create("li", ["serv"], serv.name),
        // Chan list
        chans: dom.create("ul", ["chans"]),
        main: new ChanView(serv.main).el
    };
    // Get our list of chanviews.
    var chanViews = _(serv.chans).map(function(chan) {
        return new ChanView(chan);
    });

    // Add the chans to our menu.
    (function(context) {
    _(chanViews).each(function(chan) {
        var _chan = _(chan);
        _chan.on("activate", function() {
            _(context).emit("new-active");
        });
        _chan.on("mentioned", function() {
            _(context).emit("mentioned")
        });
        elements.chans.appendChild(chan.el.li);
    });
    }(this));

    // Flash on mention.
    _(this).on("mentioned", (function(context) {
        return function() {
            if (!context.mentioned && !context.active) {
                dom.addClass(el.li, "mentioned");
                context.mentioned = true;
            }
        };
    }(this)));

    _(this).on("deactivate", (function(context) {
        return function() {
            dom.removeClass(elements.li, "active");
            context.active = false;
        }
    }(this)));

    _(this).on("activate", (function(context) {
        return function() {
            dom.addClass(elements.li, "active");
            context.active = true;
            dom.removeClass(elements.li, "mentioned");
            context.mentioned = false;
            _(context).emit("unmentioned");
        };
    }(this)));

    // Handle new channels.
    _(serv).on("new-chan", function(chan) {
        var view = new ChanView(chan);
        if (chanViews.length > 0) { 
            // Takes this path even though it was logged at 0 above
            var index = _(chanViews).chain().pluck('active').indexOf(true).value();
            chanViews.splice(index + 1, 0, view);
            elements.chans.insertBefore(view.el.li, elements.chans.childNodes[index].nextSibling);
        } else {
            chanViews.push(view);
            _(view).emit("activate");
            dom.append(elements.chans, view.el.li);
            _(this).emit("new-active", [view]);
        }
    });
    this.el = elements;
    this._chanViews = chanViews;
}

ServerView.prototype.getActiveMessageElement = function() {
    var active = _(this._chanViews).find(function(chan) {
        return chan.active;
    });
    return active ? active.el.messages : this.el.main.messages;
}
