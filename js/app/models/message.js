var Message = Backbone.Model.extend({
    initialize: function(defaults){
        if (!defaults) {
            throw "IllegalConstructArgs";
        }
        var required = ["name", "text"];
        _.each(required, function(attr) {
            if (!defaults[attr]) {
                throw "IllegalConstructArgs";
            }
        }, this);
        _.each(defaults, function(val, attr) {
           this[attr] = val;
        }, this);
    }
});
