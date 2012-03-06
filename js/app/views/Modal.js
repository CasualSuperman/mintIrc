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
		append(frag, [
			create("h1", [], "Connect"),
			create("p", [], [
				create("label", [], "Server", {for: "serv-addr"}),
				create("input", [], [], {type: "text", name: "addr", id: "serv-addr"}),
				create("label", [], "Name", {for: "serv-name"}),
				create("input", [], [], {type: "text", name: "name", id: "serv-name"})
			]),
			create("p", [], [
			])
		]);

		this.el = create("div", "modal", frag);
		this.el.id = "newServ";

		if (this.el.addEventListener) {
			this.el.addEventListener("click", function(e) {
				e.stopPropagation();
				return false;
			});
		} else {
			this.el.attachEvent("onclick", function() {
				window.event.cancelBubble = true;
				return false;
			});
		}

		return this;
	};
}());
