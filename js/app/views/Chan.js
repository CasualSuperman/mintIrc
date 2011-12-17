var ChanView = function(chan) {
    this.el = {
        li: util.create("li", ["chan"], chan.name),
        msgs: util.create("div", ["chat"], [
            util.create("div", ["log_container"]),
            util.create("input")]);
        )
    };

    this.log = this.el.msgs.getElementsByClassName("log_container")[0];
    this.log.appendChild(util.create("table", ["log"], util.create("tbody")));
    this.log = this.log.firstChild;

    _(chan).on("add-msgs", (function(context) {
        return function(premsgs, postmsgs) {
            _(premsgs).each(function(msg) {
                this.log.prependChild(new MessageView(msg).el);
            }, context);
            _(postmsgs).each(function(msg) {
                this.log.appendChild(new MessageView(msg).el);
            }, context);
        };
    }(this)));
}
