var IrcView = (function() {
    var dom = _.dom,
        append = _.dom.append;
    function setup(obj, base) {
        var elements = {
                body: document.body,
                modChan: new ModalChanWindow(), //dom.create("div", ["modal", "newChan"]),
                modServ: new ModalServWindow(), //dom.create("div", ["modal", "newServ"]),
                servList: dom.create("ul", ["servs"]),
                newServ: dom.create("li", ["serv", "nonitem"], "+"),
                newChan: dom.create("li", ["chan", "nonitem"], "+"),
                header: dom.create("header", ["connection-list"]),
                input: dom.create("input", ["chat"]),
                gradient: dom.create("div")
        };
        elements.gradient.id = "gradient";
        obj.el = elements;

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
            append(elements.body, elements.modServ.el);
        };
        elements.newChan.onclick = function() {
            append(elements.body, elements.modChan.el);
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

		var handleInput = function(e) {
			console.log(this);
			if (e.keyCode === 9) {
				var match = /\b(.*)$/.apply(this.value);
				
			} else if (e.keyCode === 13) {
				var server  = obj.getActiveServerView();
				var channel = server.getActiveChanView();
				var addr    = server.serv.addr;
				var chan    = channel.chan.name;
				var msg     = this.value;
				base.conns.irc.emit("say", {addr: addr, chan: chan, msg: msg});
				this.value = "";
			}
		};

		if (elements.input.addEventListener) {
			elements.input.addEventListener("keypress", handleInput, false);
		} else {
			elements.input.attachEvent("onkeypress", handleInput);
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
            newView.el.messages.style.top    = elements.header.offsetHeight + "px";
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
            newChan.el.messages.style.top    = elements.header.offsetHeight + "px";
			elements.gradient.innerHTML = newChan.chan.topic.str;
			elements.gradient.title = "Set by " + newChan.chan.topic.nick;
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
