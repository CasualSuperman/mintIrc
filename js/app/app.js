/*!
 * goIRC Frontend v0.1.0
 *
 * Copyright 2011, Robert Wertman
 *
 * Date: Thu Apr 07 14:26:07 2011 -0500
 */
(function() {
window.App = new Irc();
document.body.appendChild(App.el);
})();

App.chat.conns.add(new Connection({
        name: "foonetic",
        active: true,
        addr: "irc.foonetic.net:6667"
    })
);
_([new Room({
    name: "#ufeff",
    active: true
}),
new Room({
    name: "#xkcd"
}),
new Room({
    name: "#xkcd-minecraft",
    mention: true
})]).each(function(room){
    App.chat.conns.find(function(conn) {
        return conn.get("name") === "foonetic";
    }).rooms.add(room);
});
App.chat.conns.add(new Connection({
        name: "freenode",
        addr: "irc.freenode.org:6667"
    })
);
App.render();
