HTMLElement.prototype.prependChild = HTMLElement.prototype.prependChild || function(elem) {
	if (this.firstChild) {
		this.insertBefore(elem, this.firstChild);
	} else {
		this.appendChild(elem);
	}
}
