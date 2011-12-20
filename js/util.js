(function() {
    "use strict";
    var old  = window['util'],
        util = {};

    util.create = function(name, classes, contents) {
        var elem;
        var args = arguments.length;
        if (args >= 1) {
            elem = document.createElement(name);
        }
        if (args >= 2) {
            if (classes.constructor.name === "Array") {
                elem.className = classes.join(" ");
            } else {
                elem.className = classes;
            }
        }
        if (args >= 3) {
            append.call(elem, contents);
        }
        return elem;
    };

    util.append = function(items) { // Call with the context of a node.
        if (items instanceof HTMLElement) {
            this.appendChild(items);
        } else if (items instanceof Array || items instanceof NodeList) {
            each(items, append, this);
        } else if (typeof items === "string") {
            this.appendChild(document.createTextNode(items));
        } else if (items) {
            this.appendChild(items);
        }
        return this; // Chainable?
    };

    util.template = function(name, classes) {
        if (arguments.length === 2) {
            return function(contents) {
                return util.create(name, classes, contents);
            };
        } else if (arguments.length === 1) {
            return function(classes, contents) {
                if (arguments.length === 2) {
                    return util.create(name, classes, contents);
                } else if (arguments.length === 1) {
                    return util.create(name, classes);
                }
            };
        }
    };

    util.hide = function(node) {
        var old = (node.style) ? node.style.display : "";
        var unhide = function() {
            node.style.display = old;
        };
        node.style.display = "none";
        return unhide;
    };

    util.clear = function(node) {
        var done = hide(node);
        while(node.hasChildNodes) {
            node.removeChild(node.lastChild);
        }
        done();
        return this;
    };

    util.each = function(list, func, context) {
        var args = arguments.length;
        if (args > 3 || args < 2) {
            throw "IllegalArgumentException";
        }
        for (var i = 0, len = list.length; i < len; ++i) {
            var binder = context || list[i];
            func.call(binder, list[i]);
        }
    };

    util.noConflict = function() {
        window['util'] = old;
        return util;
    };
    window['util'] = util;
}());
