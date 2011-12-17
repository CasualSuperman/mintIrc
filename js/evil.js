HTMLElement.prototype.prependElement = function(elem) {
    if (this.firstChild) {
        this.insertBefore(elem, this.firstChild);
    } else {
        this.appendChild(elem);
    }
}
