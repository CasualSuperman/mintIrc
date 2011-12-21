var ChanView = function(chan) {
    var dom = _.dom;
    var elements = {
        // The Menu item.
        li: dom.create("li", ["chan"], chan.name),
        // The "body" view.
        messages: dom.create("div", ["chat"], [
                    dom.create("div", ["log_container"], 
                        dom.create("table", ["log"], dom.create("tbody"))
                    ),
                    dom.create("input")])
    };
    // Get a reference to our table for ease of use.
    var log = elements.messages.getElementsByTagName("tbody")[0];

    // Append all the already made messages.
    _(chan.messages).each(function(msg) {
        log.appendChild(new MessageView(msg).el);
    });

    _(chan).on("add-messages", (function(context) {
        return function(premsgs, postmsgs) {
            _(premsgs).each(function(msg) {
                log.prependChild(new MessageView(msg).el);
            }, context);
            _(postmsgs).each(function(msg) {
                log.appendChild(new MessageView(msg).el);
            }, context);
        };
    }(this)));

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
        };
    }(this)));

    elements.li.onclick = (function(context) {
        return function() {
            _(context).emit("activate");
        };
    }(this));

    _(this).on("activate", _.bind(function() {
        dom.addClass(elements.li, "active");
        this.active = true;
        dom.removeClass(elements.li, "mentioned");
        if (this.mentioned) {
            this.mentioned = false;
            _(this).emit("unmentioned");
        }
    }, this));

    this.el = elements;
    this.active = false;
    this.mentioned = false;
}
