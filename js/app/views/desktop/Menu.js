var MenuView = Backbone.View.extend({
    tagName: "header",
    className: "connection-list",

    serverList: null,
    chanListViewList: null,
    chanListView: null,

    initialize: function() {
        serverList.forEach(function(elem) {
            this.chanListViewList.push(new ChanListView({chanList: elem}));
        }, this)
        this.el.appendChild(serverListView.el);
        this.render();
    },

    render: function() {
        if (!this.chanListViewElem) {
            var active = serverList.find(function(elem) {
                return elem.selected;
            });
            if (!active) {
                this.chanListViewElem = chanListViewList[0].el;
            } else {
                this.chanListViewElem = null;
            }
        }
        serverListView.render();
        chanListViewElem = chanListViewList.render();
        return this;
    }
});
