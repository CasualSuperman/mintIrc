/*!
 * goIRC Frontend v0.1.0
 *
 * Copyright 2011, Robert Wertman
 *
 * Date: Thu Apr 07 14:26:07 2011 -0500
 */
$(document).ready(function() {
    var container = $("#load");
    for (var i = 0; i < 5; i++) {
        setTimeout(function() {
            container.append($("<div/>").addClass("load"));
        }, 400 * i);
    }
});
