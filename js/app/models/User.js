var User = function(nick, username, host, prefix) {
    this.nick = nick;
    this.user = username;
    this.host = host;
	this.prefix = prefix;
    this.privileges = [];
}
