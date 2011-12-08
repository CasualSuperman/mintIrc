var SrvChanView = Backbone.View.extend({
    tagName: "ul",
    classname: "rooms",

    events: {
        "click li" : "switchRooms",
    },
    initialize: function() {
        // Expects model to be a ChanList
        this.model.bind('add', this.render, this);
    },
    render: function() {
        this.el.appendChild(new ChanNameView({model: this.model.last()}).el);
    },
    switchRooms: function(e) {
        console.log(e);
    }
});
