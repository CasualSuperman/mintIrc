var ChanView = function(chan) {
    var elements = {
        // The Menu item.
        li: util.create("li", ["chan"], chan.name),
        // The "body" view.
        messages: util.create("div", ["chat"], [
                    util.create("div", ["log_container"], 
                        util.create("table", ["log"], util.create("tbody"))
                    ),
                    util.create("input")])
    };
    // Get a reference to our table for ease of use.
    var log = elements.messages.getElementsByTagName("tbody")[0];

    // Append all the already made messages.
    _(chan.messages).each(function(msg) {
        log.appendChild(new MessageView(msg).el);
    });

    _(chan).on("add-msgs", (function(context) {
        return function(premsgs, postmsgs) {
            _(premsgs).each(function(msg) {
                log.prependChild(new MessageView(msg).el);
            }, context);
            _(postmsgs).each(function(msg) {
                log.appendChild(new MessageView(msg).el);
            }, context);
        };
    }(this)));

    _(this).on("deactivate", (function(context) {
        return function() {
            elements.li.className = elements.li.className.replace(/\s+active|active\s+|active/, "");
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
            elements.li.className +=  " active";
            context.active = true;
        };
    }(this)));

    this.el = elements;
    this.active = false;
    return this;
}
