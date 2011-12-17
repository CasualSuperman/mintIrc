var ChanView = function(chan) {
    _(chan.messages).on("add", function(msgs) {
        _(msgs).each(function(msg) {
            console.log(this); // What the heck is "this";
        }, this);
    });
}
