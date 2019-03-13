$( document ).ready(function() {
    console.log("it begins!");
    var isBottomPanelExpanded = false;
    $(".bottom-panel .btn.panel-show-hide").on( "click", function() {
        if( isBottomPanelExpanded ) {
            $(".bottom-panel").animate({ "bottom": "-11em" }, 300 );
            $(".bottom-panel .btn.panel-show-hide span.dynamic-text").html("Presiona para ver más opciones");
            $(".bottom-panel .btn.panel-show-hide span.glyphicon").removeClass("glyphicon-chevron-down");
            $(".bottom-panel .btn.panel-show-hide span.glyphicon").addClass("glyphicon-chevron-up");
            isBottomPanelExpanded = false;
        }
        else {
            $(".bottom-panel").animate({ "bottom": "0" }, 300 );
            $(".bottom-panel .btn.panel-show-hide span.dynamic-text").html("Presiona para ocultar opciones");
            $(".bottom-panel .btn.panel-show-hide span.glyphicon").removeClass("glyphicon-chevron-up");
            $(".bottom-panel .btn.panel-show-hide span.glyphicon").addClass("glyphicon-chevron-down");
            isBottomPanelExpanded = true;
        }
    });
});