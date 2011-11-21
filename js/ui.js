(function (){

function resize() {
	var offset = document.getElementsByTagName("header")[0].clientHeight;
	document.getElementById("log").style.paddingTop = (offset) + "px";
}
function ready() {
	resize();
//	stickToBottom();
}

function stickToBottom() {
	var maxSize = document.getElementById("chat").clientHeight;
	var log = document.getElementById("log");
	var defaultSize = log.clientHeight - log.style.paddingTop.split("px")[0];
	var marginSize  = log.style.marginTop.split("px")[0];
	if(defaultSize > maxSize) {
		var offset = document.getElementsByTagName("header")[0].clientHeight;
		offset -= document.getElementById("gradient").clientHeight / 2;
		log.style.paddingTop = offset + "px";
	} else {
		var val = maxSize - defaultSize - marginSize;
		log.style.paddingTop = val + "px";
	}
	setTimeout(stickToBottom, 300);
}

window.onload = ready;

})();

Metro = {
	ui:{
		accentColor: "#00AEDB",
		backgroundColor: "#FFF",
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
        transitionLength: 500
	}
};
