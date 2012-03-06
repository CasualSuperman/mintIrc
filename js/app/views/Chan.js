var ChanView = (function() {
    return function(chan) {
        var dom = _.dom,
            elements = {
            // The Menu item.
            li: dom.create("li", ["chan"], chan.name),
            // The "body" view.
            messages: dom.create("div", ["log_container", "is-selectable"],
                          dom.create("table", ["log"],
                            dom.create("tbody")))
        },
            context = this;
        // Get a reference to our table for ease of use.
		var container = elements.messages;
        var log = elements.messages.getElementsByTagName("tbody")[0];

        // Append all the already made messages.
        _(chan.messages).each(function(msg) {
            log.appendChild(new MessageView(msg).el);
        });

        _(chan).on("new-msgs", function(premsgs, postmsgs) {
			var toScroll =
				container.scrollTop === (container.scrollHeight
										- container.clientHeight);
            _(premsgs).each(function(msg) {
                _.dom.prependChild(log, new MessageView(msg).el);
            }, context);
            _(postmsgs).each(function(msg) {
                log.appendChild(new MessageView(msg).el);
            }, context);
			if (toScroll) {
				container.scrollTop = container.scrollHeight;
			}
        });

        _(chan).on("mentioned", function() {
            if (!context.active) {
                context.mention();
            }
        });

		_(chan).on("removed", function() {
			_(context).emit("removed");
		});

		_(chan).on("new-topic", function() {
			if (context.active) {
				_.emit("new-topic", [chan]);
			}
		});

        elements.li.onclick = function() {
            _.emit("new-active-chan", [context]);
            context.activate();
        };

        this.el = elements;
        this.active = false;
        this.mentioned = false;
		this.chan = chan;
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
