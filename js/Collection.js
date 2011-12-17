(function() {
    "use strict";
    var old  = window['Collection'],
        collection = Collection;

    function Collection() {
        if (arguments.length === 0) {
            this.data = [];
        } else {
            for (var i = 0, len = arguments.length; i < len; ++i) {
                this.data = _add(this.data, arguments[i]);
            }
        }
    };


    collection.noConflict = function() {
        window['collection'] = old;
        return collection;
    }
    window['Collection'] = collection;
}());
