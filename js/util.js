(function() {
    "use strict";
    var old  = window['util'],
        util = {};
    function create(name, classes, contents) {
        var elem;
        switch (4 - arguments.length) {
            case 1:
                elem = document.createElement(name);
            case 2:
                if (classes.constructor.name === "Array") {
                    elem.className = classes.join(" ");
                } else {
                    elem.className = classes;
                }
            case 3:
                if (contents instanceof HTMLElement) {
                    elem.appendChild(contents);
                } else {
                    elem.appendChild(document.createTextNode(contents));
                }
        }
        return elem;
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

    util.create = create;
    util.template = template;
    util.noConflict = function() {
        window['util'] = old;
        return util;
    }
    window['util'] = util;
}());
