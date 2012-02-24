/*!
 * goIRC Frontend v0.1.0
 *
 * Copyright 2011, Robert Wertman
 *
 * Date: Thu Apr 07 14:26:07 2011 -0500
 */
var Conns = new ServerList;
Conns.add(new Server({
        name: "foonetic",
        addr: "irc.foonetic.net:6667",
        nick: "CasualSuperman"
    })
);
_([new Chan({
    name: "#ufeff",
}),
new Chan({
    name: "#xkcd"
}),
new Chan({
    name: "#xkcd-minecraft",
})]).each(function(room){
    Conns.first().chans.add(room);
});
Conns.add(new Server({
        name: "freenode",
        addr: "irc.freenode.org:6667",
        nick: "CasualSuperman"
    })
);

(function() {
window.App = new Irc({el: document.body, serverList: Conns});
})();

