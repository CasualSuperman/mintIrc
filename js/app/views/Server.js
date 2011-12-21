var ServerView = function(serv) {
    var dom = _.dom;
    var elements = {
        // Menu item
        li: dom.create("li", ["serv"], serv.name),
        // Chan list
        chans: dom.create("ul", ["chans"])
    };
    // Get our list of chanviews.
    var chanViews = _(serv.chans).map(function(chan) {
        return new ChanView(chan);
    });

    // Add the chans to our menu.
    _(chanViews).each(function(chan) {
        elements.chans.appendChild(chan.el.li);
    });
    
    // Handle new channels.
    _(serv).on("new-chan", function(chan) {
        // Object
        console.log(chan);
        // 0
        console.log(chanViews.length);
        // [ object ]
        console.log(chanViews);
        global = chanViews; // This was so I could look at it after the fact.
        // 0
        console.log(chanViews.length);
        // This is the object that is already contained in chanViews above.
        var view = new ChanView(chan);
        if (chanViews.length > 0) { 
            // Takes this path even though it was logged at 0 above
            var index = _(chanViews).chain().pluck('active').indexOf(true).value();
            chanViews.splice(index + 1, 0, view);
            elements.chans.insertBefore(view.el.li, elements.chans.childNodes[index].nextSibling);
        } else {
            chanViews.push(view);
            view.active = true;
            dom.append(elements.chans, view.li);
            _(this).emit("new-active", [view]);
        }
    });
    this.el = elements;
}
