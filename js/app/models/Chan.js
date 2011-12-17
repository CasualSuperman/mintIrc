var Chan = (function() {
    return function(values) {
        this.name = values.name;
        this.topic = values.topic || "";
        this.users = values.users || [];
        this.messages = values.messages || [];
    };
}());
