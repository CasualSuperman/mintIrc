var ChatBar = Backbone.View.extend({
    id: "talk",
    tagName: "input",

    events: {
        "keypress" : "validate"
    },

    render: function() {
        return this;
    }
});
