var User = Backbone.Model.extend({
    nick: null,
    name: "",
    address: "",

    initialize: function(defaults) {
        if (!defaults) {
            throw "IllegalConstructArgs";
        }
        var required = ["nick"];
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
