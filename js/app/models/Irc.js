var Irc = (function() {
    var connect = function() {
        var ws = new WebSocket("ws://localhost:3654");
        var _ws = _(ws);
        ws.onmessage = function(e) {
            _ws.emit("message", [e]);
        };
        ws.onerror = function(e) {
            _ws.emit("error", [e]);
        };
        ws.onclose = function(e) {
            _ws.emit("close", [e]);
        };
        ws.onopen = function(e) {
            _ws.emit("open", [e]);
        };
        return ws;
    }
    return function(values) {
        var dom = _.dom;
        var elements = {
            body: document.body,
            newChan: (function() {
                var div = dom.create("div", "modal");
                div.id = "chan_modal";
                return div;
            }()),
            newServ: (function() {
                var div = dom.create("div", "modal");
                div.id = "serv_modal";
                return div;
            }())
        };
        values = values || {};
        this.servers = values.servers || [];
        this.conn    = values.conn || (window.WebSocket) ? connect.call(this) : {};
        this.handle();
        this.el = elements;
    }
}());

Irc.prototype.addServer = function(serv) {
    var exists = _.find(this.servers, function(server) {
        return server.addr === serv.addr;
    });
    if (!exists) {
        this.servers.push(serv);
        _(this).emit("new-server", [serv])
    }
};

Irc.prototype.handle = function() {
    var _conn = _(this.conn),
        context = this;
    _conn.on("open", function(e) {
        console.log("Connection open!");
    });
    _conn.on("close", function(e) {
        console.log("Connection closed.");
    });
    _conn.on("message", function(e) {
        var info = JSON.parse(e.data);
        var serv = _.find(context.servers, function(serv) {
            return serv.addr === info.Server;
        });
        if (serv) {
            serv.addMessage(new Message(info.Line));
        } else {
            console.log("Data sent with server " + info.Server + ", but no such server found.");
        }
    });
    _conn.on("error", function(e) {
        console.log("Connection error: ", e);
    });
}
