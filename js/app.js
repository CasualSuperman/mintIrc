/*!
 * goIRC Frontend v0.1.0
 *
 * Copyright 2011, Robert Wertman
 *
 * Date: Thu Apr 07 14:26:07 2011 -0500
 */
var irc = {
	connections: [],
	newConnection: function(server, nick) {
		
	},
	newChannel: function(server, channel) {
		
	},
	newPM: function(server, nick) {
		
	}
};

var Channel = function(Server, nick) {
	
};

Channel.prototype = {
	connect: function() {
	},
    disconnect: function() {

    },
    join: function(name) {

    },
    part: function(name) {

    }
};

$("#networks .nonitem").click(function() {
    var div = $("<div/>").addClass("testing");
    var colors = {
        bg: {
            black: "#000",
            white: "#FFF"
        },
        fg: {
            blue: "#00AEDB",
            green: "#00B159",
            orange: "#F37735",
            pink: "#EC098C",
            purple: "#7C4199",
            red: "#D11141",
            yellow: "#FFC425"
        }
    };
    var header = $("<h4/>").text("Backgrounds:").css("clear", "right");
    console.log(header);
    div.append(header);
    for (var bg in colors.bg) {
        div.append($("<div/>").data("color", colors.bg[bg]).css({margin: "2px", float: "left", width: "10px", height: "10px", backgroundColor: colors.bg[bg], padding: "2px", border: "1px solid #666"}).click(function() {
            Metro.ui.updateBackground($(this).data("color"));
        }));
    }
    header = $("<h4/>").text("Colors:").css("clear", "left");
    div.append(header);
    for (var fg in colors.fg) {
        div.append($("<div/>").data("color", colors.fg[fg]).css({margin: "2px", float: "left", width: "10px", height: "10px", backgroundColor: colors.fg[fg], padding: "2px", border: "1px solid #666"}).click(function() {
            Metro.ui.updateAccent($(this).data("color"));
        }));
    }
    div.append($("<br/>").css("clear", "left"));
    div.css({
        top: "5px",
        position: "fixed",
        right: "10px",
        zIndex: "3"
    });
    $("body").append(div);
    $(this).click(function(){});
});
