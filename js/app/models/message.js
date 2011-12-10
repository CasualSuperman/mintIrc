var Message = Backbone.Model.extend({
    sender: null,
    text: null,
    mono: false,

    initialize: function(defaults){
        if (!defaults) {
            throw "IllegalConstructArgs";
        }
        var required = ["text"];
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
