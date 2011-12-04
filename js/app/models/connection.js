var Connection = Backbone.Model.extend({
    initialize: function(defaults){
        if (!defaults) {
            throw "IllegalConstructArgs";
        }
        var required = ["name"];
        _.each(required, function(attr) {
            if (!defaults[attr]) {
                throw "IllegalConstructArgs";
            } else {
               this[attr] = defaults[attr]; 
            }
        }, this);
        this.rooms = new RoomList;
    }
});
