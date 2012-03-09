var ModalChanWindow = (function() {
	var create = _.dom.create;
	return function() {
		var frag = document.createDocumentFragment();
		frag.appendChild(create("h1", [], "Join"));
		this.el = create("div", "modal", frag);
		this.el.id = "newChan";
		return this;
	};
}());

var ModalServWindow = (function() {
	var create = _.dom.create;
	var append = _.dom.append;
	return function() {
		var frag = document.createDocumentFragment();
		var addr_lbl = create("label", [], "Server", {for: "serv-addr"});
		var addr_input = create("input", [], [], {
			type: "text",
			name: "addr",
			id: "serv-addr",
			autofocus: true
		});
		var name_lbl = create("label", [], "Name", {for: "serv-name"});
		var name_input = create("input", [], [], {
			type: "text",
			name: "name",
			id: "serv-name"
		});
		var nick_lbl = create("label", [], "Nick", {for: "serv-nick"});
		var nick_input = create("input", [], [], {
			name: "nick",
			id: "serv-nick"
		});
		var connect = create("input", [], undefined, {type: "button", value: "Connect"});
		append(frag, [
			create("h1", [], "Connect"),
			create("p", [], [
				addr_lbl,
				addr_input,
			]),
			create("p", [], [
				name_lbl,
				name_input
			]),
			create("p", [], [
				nick_lbl,
				nick_input
			]),
			create("p", [], [
				connect
			])
		]);

		var inputs = [addr_input, name_input, nick_input];

		this.el = create("div", "modal", frag);
		this.el.id = "newServ";

		var doType = function(e) {
			if (this === addr_input) {
				name_input.value = getLongestSubstr(addr_input.value);
			}
			if (e.keyCode === 13) {
				if (addr_input.value && name_input.value && nick_input) {
					doConnect();
				}
			}
		};

		var doConnect = function() {
				App.serverName(addr_input.value, name_input.value);
				App.connect(addr_input.value, []);
				View.hideModal();
		};

		if (this.el.addEventListener) {
			this.el.addEventListener("click", _.event.cancel);
			_.forEach(inputs, function(input) {
				input.addEventListener("keydown", doType);
			});
			connect.addEventListener("click", doConnect);
		} else {
			this.el.attachEvent("onclick", _.event.cancel);
			_.forEach(inputs, function(input) {
				input.attachEvent("onkeydown", doType);
			});
			connect.attachEvent("onclick", doConnect);
		}

		return this;
	};
}());
