Metro = {
    ui: (function() {
        function _update() {
            var className = document.body.className;
            if (classname === undefined || className === "")
                document.body.className = "transition";
            else
                document.body.className += " transition";
            less.refresh(true);
            StyleFix.process();
            setTimeout(function(){
                document.body.className = className;
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
                black: "#000000",
                white: "#FFFFFF"
            },

            updateAccent: function(color) {
                this.accentColor = color;
                _update();
            },
            updateBackground: function(color) {
                this.backgroundColor = color;
                _update();
            }
        }
    })()
};
Metro.ui.config = (function() {
    return {
        accentColor: Metro.ui.accents.blue,
        backgroundColor: Metro.ui.backgrounds.white,
        transitionLength: 500
    }
})();
