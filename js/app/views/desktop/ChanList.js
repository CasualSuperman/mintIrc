var ChanListView = Backbone.View.extend({
    tagName: "ul",
    classname: "chans",

    chanList: null,

    initialize: function() {
        this.render();
    },

    render: function() {
        this.el = this.make(this.tagName, {class: this.className});
        chanList.forEach(function(elem) {
            this.el.appendChild(new ChanListItemView({model: elem}).render().el);
        }, this);
        return this;
    },
});
