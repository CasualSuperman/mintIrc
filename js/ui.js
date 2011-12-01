(function (){
    window.onload = function() {
        resize();
    }
    function resize() {
        var offset = document.getElementsByTagName("header")[0].clientHeight;
        document.getElementById("chat").style.marginTop = (offset) + "px";
    }
})();

Metro = {
	ui:{
        accents: {
            blue: "#00AEDB",
            green: "#00B159",
            orange: "#F37735",
            pink: "#EC098C",
            purple: "#7C4199",
            red: "#D11141",
            yellow: "#FFC425"
        },
        backgrounds: {
            black: "#000",
            white: "#FFF"
        },
		accentColor: Metro.ui.accents.blue,
		backgroundColor: Metro.ui.backgrounds.white,
        transitionLength: 500

        updateAccent: function(color) {
            this.accentColor = color;
            this._update();
        },
        updateBackground: function(color) {
            this.backgroundColor = color;
            this._update();
        },
        _update: function() {
            $("body").addClass("transition");
            less.refresh(true);
            StyleFix.process();
            setTimeout(function(){
                $("body").removeClass("transition");
            }, this.transitionLength);
        },
	}
};
