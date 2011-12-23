var DefaultServerView = (function() {
    return function() {
        this.el = {
            chans: _.dom.create("li")
        };
    };
}());

DefaultServerView.prototype.getActiveChanView = function() {
    return {
        el: {
            messages: _.dom.create("div")
        }
    }
}
