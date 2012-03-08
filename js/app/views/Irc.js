var IrcView = (function() {
	var dom = _.dom,
		append = _.dom.append;
	function setup(obj, base) {
		var elements = {
			body: document.body,
			modal: dom.create("div"),
			modChan: new ModalChanWindow(), //dom.create("div", ["modal", "newChan"]),
			modServ: new ModalServWindow(), //dom.create("div", ["modal", "newServ"]),
			servList: dom.create("ul", ["servs"]),
			newServ: dom.create("li", ["serv", "nonitem"], "+"),
			newChan: dom.create("li", ["chan", "nonitem"], "+"),
			header: dom.create("header", ["connection-list"]),
			input: dom.create("input", ["chat", "is-selectable"]),
			gradient: dom.create("div")
		};
		elements.body.appendChild(elements.modal);
		elements.gradient.id = "gradient";
		elements.modal.id = "modal";
		elements.input.autofocus = true;
		obj.el = elements;

		obj.history = {
			messages: [],
			position: 0,
			current: ""
		};

		var hideModal = function() {
			dom.removeClass(elements.modal, "show");
			dom.clear(elements.modal);
		};

		if (elements.modal.addEventListener) {
			elements.modal.addEventListener("click", hideModal, false);
		} else {
			elements.modal.attachEvent("onclick", hideModal);
		}

		// View for 0 servers.
		obj._defaultServ = new DefaultServerView();
		var serverViews = _.map(base.servers, function(serv) {
			return new ServerView(serv);
		});

		// Activate first server.
		if (serverViews.length > 0) {
			serverViews[0].activate();
		}
		// Set up server menu
		_.each(serverViews, function(servView) {
			append(elements.servList, servView.el.li);
		});
		elements.servList.appendChild(elements.newServ);
		
		// Make globally accessible.
		obj._serverViews = serverViews;

		/* Dom Events. */
		elements.newServ.onclick = function() {
			append(elements.modal, elements.modServ.el);
			dom.addClass(elements.modal, "show");
		};
		elements.newChan.onclick = function() {
			append(elements.modal, elements.modChan.el);
			dom.addClass(elements.modal, "show");
		};

		/* Dom Structure. */
		var activeServer = obj.getActiveServerView();
		elements.chanList = activeServer.el.chans;

		append(elements.header, [
			elements.servList,
			elements.chanList,
			elements.gradient
		]);
		append(elements.body, [
			elements.header,
			activeServer.getActiveChanView().el.messages,
			elements.input
		]);

		var keys = {
			"tab": 9,
			"enter": 13,
			"up": 38,
			"down": 40
		};

		var handleInput = function(e) {
			if (e.keyCode === keys["tab"]) {
				var lookAt = _.dom.cursorPos(this);
				var inspect = this.value.substring(0, lookAt);
				var match = /\w*?$/.exec(inspect);
				var users = obj.getActiveServerView().getActiveChanView().chan.users;
				var matches = [];
				if (match) {
					var frag = match[0].toLowerCase();
					_.forEach(users, function(mod, nick) {
						if (nick.toLowerCase().indexOf(frag) === 0) {
							matches.push(nick);
						}
					});
					matches.sort();
					if (matches.length === 1) {
						this.value = inspect +
							matches[0].substring(match[0].length,
												 matches[0].length) +
							this.value.substring(lookAt, this.value.length) +
							": ";
						_.dom.select(this, this.value.length);
					} else if (matches.length > 1) {
						console.log(matches);
					}
				}
				_.event.cancel(e);
			} else if (e.keyCode === keys["enter"]) {
				var server  = obj.getActiveServerView();
				var channel = server.getActiveChanView();
				var addr	= server.serv.addr;
				var chan	= channel.chan.name;
				var msg	 = this.value;
				if (msg.toLowerCase().indexOf("/me ") === 0) {
					msg = msg.slice(4);
					base.conns.irc.emit("action", {addr: addr, chan: chan, msg: msg});
				} else {
					base.conns.irc.emit("say", {addr: addr, chan: chan, msg: msg});
				}
				obj.history.messages.unshift(msg);
				obj.history.position = -1;
				this.value = "";
			} else if (e.keyCode === keys["up"]) {
				var position = ++obj.history.position;
				if (position === 0) {
					obj.history.current = this.value;
				}
				if (position < obj.history.messages.length) {
					this.value = obj.history.messages[position];
				} else {
					obj.history.position--;
				}
				console.log("Selecting.");
				_.dom.select(this);
				_.event.cancel(e);
			} else if (e.keyCode === keys["down"]) {
				var position = --obj.history.position;
				if (position === -1) {
					this.value = obj.history.current;
					obj.history.current = "";
					_.dom.select(this, this.value.length);
				} else {
					this.value = obj.history.messages[position];
					console.log("Selecting.");
					_.dom.select(this);
				}
				_.event.cancel(e);
			}
		};

		if (elements.input.addEventListener) {
			elements.input.addEventListener("keydown", handleInput, false);
		} else {
			elements.input.attachEvent("onkeydown", handleInput);
		}

		obj._serverViews = serverViews;
	}
	return function(irc) {
		setup(this, irc);

		var elements = this.el,
			context = this,
			serverViews = this._serverViews;

		/* Global event handling. */
		_.on("new-active-chan", function(newView) {
			var oldView = context.getActiveServerView().getActiveChanView();
			oldView.deactivate();
			newView.activate();
			elements.body.replaceChild(newView.el.messages, oldView.el.messages);
			newView.el.messages.style.bottom = elements.input.offsetHeight + "px";
			newView.el.messages.style.top	= elements.header.offsetHeight + "px";
			elements.gradient.innerHTML = newView.chan.topic.str;
			elements.gradient.title = "Set by " + newView.chan.topic.nick;
		});

		_.on("new-topic", function(chan) {
			elements.gradient.innerHTML = chan.topic.str;
			elements.gradient.title = "Set by " + chan.topic.nick;
		});

		_.on("new-active-serv", function(newView) {
			var oldView = context.getActiveServerView();
			oldView.deactivate();
			newView.activate();
			var oldChan = oldView.getActiveChanView();
			var newChan = newView.getActiveChanView();
			elements.body.replaceChild(newChan.el.messages, oldChan.el.messages);
			elements.header.replaceChild(newView.el.chans, oldView.el.chans);
			append(newView.el.chans, elements.newChan);
			newChan.el.messages.style.bottom = elements.input.offsetHeight + "px";
			newChan.el.messages.style.top	= elements.header.offsetHeight + "px";
			elements.gradient.innerHTML = newChan.chan.topic.str;
			elements.gradient.title = "Set by " + newChan.chan.topic.nick;
		});

		_.on("disconnected", function() {
			context.getActiveServerView().getActiveChanView().chan
				.addMessage(new Message({
					msg: "Disconnected.",
					action: true,
					nick: ""
				});
		});

		/* Local event handling. */
		_(irc).on("new-server", function(server) {
			var view = new ServerView(server);
			if (serverViews.length > 0) {
				var index = _.indexBy(serverViews, function(serv) {
					return serv.active === true;
				});
				serverViews.splice(index + 1, 0, view);
				elements.servList.insertBefore(view.el.li, elements.servList.childNodes[index + 1]);
			} else {
				serverViews.push(view);
				_.dom.prependChild(elements.servList, view.el.li);
				_.emit("new-active-serv", [view]);
				view.activate();
			}
		});
	};
}());

IrcView.prototype.getActiveServerView = function() {
	var active = _.find(this._serverViews, function(serv) {
		return serv.active;
	});
	return active ? active : this._defaultServ;
};
