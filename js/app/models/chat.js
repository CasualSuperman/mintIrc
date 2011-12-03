var Chat = Backbone.Model.extend({
    initialize: function(){
        this.messages = new MessageList;
    }
});
