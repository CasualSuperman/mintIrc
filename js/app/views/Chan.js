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
            dom.removeClass(el.li, "active");
            context.active = false;
        };
    }(this)));

    elements.li.onclick = (function(context) {
        return function() {
            _(context).emit("activate");
        };
    }(this));

    _(this).on("activate", (function(context) {
        return function() {
            dom.addClass(el.li, "active");
            context.active = true;
            dom.removeClass(el.li, "mentioned");
            context.mentioned = false;
            _(context).emit("unmentioned");
        };
    }(this)));

    this.el = elements;
    this.active = false;
    this.mentioned = false;
    return this;
}
