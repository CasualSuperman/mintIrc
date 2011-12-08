var SrvChanView = Backbone.View.extend({
    tagName: "ul",
    classname: "rooms",

    events: {
        "click li" : "switchRooms",
    },
    initialize: function() {
        // Expects model to be a ChanList
        this.model.bind('add', this.add, this);
        this.model.bind('remove', this.remove, this);
    },
    render: function() {
        this.el.appendChild(new ChanNameView({model: this.model.last()}).el);
    },
    switchRooms: function(e) {
        console.log(e);
    },
    add: function(e) {
        console.log(e);
    },
    remove: function(e) {
        console.log(e);
    }
});
