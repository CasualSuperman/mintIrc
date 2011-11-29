function loaded(elem) {
    $(elem).children(".load")
               .fadeOut(500, function(){
                    $(this).parent(".is-loading")
                               .removeClass("is-loading");
                    $(this).remove()
               });
}
