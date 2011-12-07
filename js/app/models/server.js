var Server = Backbone.Model.extend({

    chans: new ChanList,

    initialize: function(defaults){
        if (!defaults) {
            throw "IllegalConstructArgs";
        }

        var required = ["name", "addr", "nick"];
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
