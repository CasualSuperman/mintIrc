var Message = (function() {
    return function(values) {
        this.time   = values.time;
        this.author = values.author;
        this.text   = values.text;
        this.mono   = values.mono;
    };
}());
