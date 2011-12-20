(function() {
    "use strict";
    var old  = window['util'],
        util = {};

    function create(name, classes, contents) {
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
    }

    function append(items) { // Call with the context of a node.
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
    }

    function template(name, classes) {
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
    }

    function hide(node) {
        var unhide = function() {node.style.display = ""};
        if (node.style !== undefined) {
            var old = node.style.display;
            unhide = function() {
                node.style.display = old;
            }
        } else {
            node.style = "";
        }
        node.style.display = "none";
        return unhide;
    }

    function clear(node) {
        var done = hide(node);
        while(node.hasChildNodes) {
            node.removeChild(node.lastChild);
        }
        done();
        return this;
    }

    function each(list, func, context) {
        var args = arguments.length;
        if (args > 3 || args < 2) {
            throw "IllegalArgumentException";
        }
        for (var i = 0, len = list.length; i < len; ++i) {
            var binder = context || list[i];
            func.call(binder, list[i]);
        }
    }

    util.create = create;
    util.template = template;
    util.each = each;
    util.clear = clear;
    util.hide = hide;
    util.append = append;
    util.noConflict = function() {
        window['util'] = old;
        return util;
    }
    window['util'] = util;
}());
