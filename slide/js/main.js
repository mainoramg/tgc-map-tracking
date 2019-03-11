$( document ).ready(function() {
    //
    /*$(".footer").swipe({
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if( direction == "up" )
            {
                $( ".footer" ).animate({ "top": "35em" }, 300 );
            }
            else if( direction == "down" )
            {
                $( ".footer" ).animate({ "top": "49em" }, 300 );
            }
            //$(this).text("You swiped " + direction );  
        }
    });*/
    console.log("it begins!");
    var isFooterExpanded = false;
    $(".footer").on( "click", function() {
        if( isFooterExpanded ) {
            console.log("line 21");
            $( ".footer" ).animate({ "bottom": "-11em" }, 300 );
            isFooterExpanded = false;
        }
        else {
            console.log("line 26");
            $( ".footer" ).animate({ "bottom": "0" }, 300 );
            isFooterExpanded = true;
        }
    });
});