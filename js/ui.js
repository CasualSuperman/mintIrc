(function (){
    window.onload = function() {
        resize();
    }
    function resize() {
        var offset = document.getElementsByTagName("header")[0].clientHeight;
        document.getElementById("chat").style.marginTop = (offset) + "px";
    }
})();
