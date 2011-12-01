Metro = {
    ui: (function() {
        function _update() {
            $("body").addClass("transition");
            less.refresh(true);
            StyleFix.process();
            setTimeout(function(){
                $("body").removeClass("transition");
            }, Metro.ui.config.transitionLength);
        };

        return {
            accents: {
                blue:   "#00AEDB",
                green:  "#00B159",
                orange: "#F37735",
                pink:   "#EC098C",
                purple: "#7C4199",
                red:    "#D11141",
                yellow: "#FFC425"
            },
            backgrounds: {
                black: "#000",
                white: "#FFF"
            },

            updateAccent: function(color) {
                this.accentColor = color;
                _update();
            },
            updateBackground: function(color) {
                this.backgroundColor = color;
                _update();
            },
            config: {
                accentColor: Metro.ui.accents.blue,
                backgroundColor: Metro.ui.backgrounds.white,
                transitionLength: 500
            }
        }
    })()
};
