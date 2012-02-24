var ServerView = Backbone.View.extend({
    model: null,
    chanViewList: [],

    menuItem: null,
    chanListView: null,
    chanView: null,

    initialize: function() {
        this.menuItem = new ServerListItemView({model: this.model}).el;
        this.chanListView = new ChanListView({model: this.model.chans}).el;
        this.chanViewList.push(new ChanView({model: null}));
        this.model.chans.forEach(function(elem) {
            this.chanViewList.push(new ChanView({model: elem}));
        }, this);
        this.chanViewList[0].active = true;
        this.chanView = this.chanViewList[0].el;
    }
});
