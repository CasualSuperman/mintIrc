(function() {
    "use strict";
    var _ = window._;

    if (! String.prototype.trim) {
        var trimReg = /^\s+|\s+$/g;
        String.prototype.trim = function() {
            return this.replace(trimReg, "");
        };
    }

    function createNode(name, classes, contents) {
        var elem;
        var args = arguments.length;
        if (_(name).isString()) {
            elem = document.createElement(name);
        }
        var _classes = _(classes);
        if (_classes.isArray()) {
            elem.className = classes.join(" ");
        } else if (_classes.isString()) {
            elem.className = classes;
        }
        if (!_(contents).isUndefined()) {
            appendThings(elem, contents);
        }
        return elem;
    }

    function appendThings(node, items) {
        var _items = _(items);
        if (_items.isElement()) {
            node.appendChild(items);
        } else if (_items.isArray() || items instanceof NodeList) {
            _items.each(function(item) {
                appendThings(node, item);
            });
        } else if (_items.isString()) {
            node.appendChild(document.createTextNode(items));
        } else {
            node.appendChild(items);
        }
    }

    function templateNode(name, classes, content) {
        switch(arguments.length) {
            case 0:
                return function(na, cl, co) {
                    return createNode(na, cl, co);
                };
            case 1:
                return function(cl, co) {
                    return createNode(name, cl, co);
                };
            case 2:
                return function(co) {
                    return createNode(name, classes, co);
                };
            case 3:
                return function() {
                    return createNode(name, classes, content);
                };
            default:
                throw "IllegalArgCount";
        }
    }

    function hide(node) {
        var old = (node.style) ? node.style.display : "";
        var unhide = function() {
            node.style.display = old;
        };
        node.style.display = "none";
        return unhide;
    }

    function clear(node) {
        var done = hide(node);
        while(node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
        done();
    }

    function addClass(node, className) {
        if (!node.className.match(new RegExp("\\b" + className + "\\b"))) {
            node.className = ((node.className || "") + " " + className).trim();
        }
    }

    function toggleClass(node, className) {
        var reg = new RegExp("\\b" + className + "\\b");
        if (reg.test(node.className)) {
            node.className = node.className.replace(reg, "").trim();
        } else {
            node.className = (node.className + " " + className).trim();
        }
    }

    function removeClass(node, className) {
        node.className = node.className.replace(new RegExp("\\b" + className + "\\b"), "").trim();
    }

    _.dom = {
        create:   createNode,
        template: templateNode,
        addClass:     addClass,
        removeClass:  removeClass,
        toggleClass:  toggleClass,
        clear:        clear,
        hide:         hide,
        append: appendThings
    };
}());
