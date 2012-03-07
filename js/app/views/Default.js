var DefaultServerView = (function() {
	var chans = _.dom.create("ul");
	return function() {
		this.el = {
			chans: chans
		};
	};
}());

var MainChanView = (function() {
	var messages = _.dom.create("div");
	return function() {
		this.el = {
			messages: messages
		}
	};
}());

DefaultServerView.prototype.getActiveChanView = (function() {
	var view = {
		el: {
			messages: _.dom.create("div")
		}
	}
	return function() {
		return view;
	}
}());

DefaultServerView.prototype.deactivate = function() {
	
};
MainChanView.prototype.deactivate = function() {
	
};
DefaultServerView.prototype.activate = function() {
	
};
MainChanView.prototype.activate = function() {
	
};
