var ChanView = (function() {
    return function(chan) {
        var dom = _.dom;
        var elements = {
            // The Menu item.
            li: dom.create("li", ["chan"], chan.name),
            // The "body" view.
            messages: dom.create("div", ["chat"], [
                        dom.create("div", ["log_container"], 
                          dom.create("table", ["log"],
                            dom.create("tbody"))),
                        dom.create("input")
                      ])
        };
        // Get a reference to our table for ease of use.
        var log = elements.messages.getElementsByTagName("tbody")[0];

        // Append all the already made messages.
        _(chan.messages).each(function(msg) {
            log.appendChild(new MessageView(msg).el);
        });

        _(chan).on("new-msgs", (function(context) {
            return function(premsgs, postmsgs) {
                _(premsgs).each(function(msg) {
                    _.dom.prependChild(log, new MessageView(msg).el);
                }, context);
                _(postmsgs).each(function(msg) {
                    log.appendChild(new MessageView(msg).el);
                }, context);
            };
        }(this)));

        elements.li.onclick = (function(context) {
            return function() {
                _(context).emit("activate");
            };
        }(this));

        this.el = elements;
        this.active = false;
        this.mentioned = false;
    };
}());

ChanView.prototype.activate = function() {
    _.dom.addClass(this.el.li, "is-active");
    this.active = true;
    this.unmention();
};

ChanView.prototype.deactivate = function() {
    _.dom.removeClass(this.el.li, "is-active");
    this.active = false;
};

ChanView.prototype.mention = function() {
    _.dom.addClass(this.el.li, "is-interesting");
    this.mentioned = true;
};

ChanView.prototype.unmention = function() {
    if (this.mentioned) {
        this.mentioned = false;
        _.dom.removeClass(this.el.li, "is-interesting");
    }
};
