function getVariableFromURL( variable )
{
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++)
   {
      var pair = vars[i].split("=");
      if(pair[0] == variable)
      {
         return pair[1];
      }
   }
   return(false);
}
function validateCorrectData( res )
{
   var correctData = true;
   var error = res.error;
   if( error != null )
   {
      correctData = false;
      console.log( "error="+error );
      alert( "Error: " + error );
   }
   if( res.locations != null)
   {
      if( res.locations.length == 0 )
      {
         correctData = false;
         console.log( "error=res.locations.length = 0" );
         alert( "Error: No data for this SN" );
      }
   }
   return correctData;
}
function ConvertDMSToDD( degrees, minutes, seconds, direction )
{
   var dd = degrees + minutes/60 + seconds/(60*60);
   if (direction == "S" || direction == "W")
   {
      dd = dd * -1;
   }
   return dd;
}
var map;
var marker;
function initMap() {
   var sn  = "";
   if( sn == null || sn == "0" || sn == "" )
   {
      sn = getVariableFromURL( "sn" );
   }
   if( sn == null || sn == "0" || sn == "" )
   {
      sn = "9170670374";
   }
   var carColor = "";//"#FF0000";
   if( carColor == null || carColor == "" )
   {
      carColor = "#" + getVariableFromURL( "color" );
   }
   var lngInitial    =  0;
   var latInitial    =  0;
   var angleInitial  =  0;
   //$.get("http://localgps.mainor.com/v1/locationdd/now/sn/"+sn, {}, function(res,resp) {
   $.get("http://gps.mainoramg.com/v1/locationdd/now/sn/"+sn, {}, function(res,resp) {
      
      if( validateCorrectData( res ) )
      {
         latInitial     =  parseFloat(res.locations[0].latitude);
         lngInitial     =  parseFloat(res.locations[0].longitude);
         angleInitial   =  parseInt(res.locations[0].angle);
         console.log("latInitial="+latInitial);
         console.log("latInitial="+lngInitial);
         console.log("angleInitial="+angleInitial);
         var carIconInitial = 
         { // car icon
            path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188zM32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336h13.771l2.219,3.336H14.568zM31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
            scale: 0.7,
            fillColor: carColor, //<-- Car Color, you can change it 
            fillOpacity: 1,
            strokeWeight: 1,
            size: new google.maps.Size(25, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(12, 25),
            rotation: angleInitial //<-- Car angle
         };
         map = new google.maps.Map(
            document.getElementById('map'),
            {
               center: { lat: latInitial, lng: lngInitial },
               zoom: 17,
               mapTypeControl: true,
               mapTypeControlOptions: {
                  style: google.maps.MapTypeControlStyle.DEFAULT,
                  position: google.maps.ControlPosition.LEFT_TOP
               },
               zoomControl: true,
               zoomControlOptions: {
                  position: google.maps.ControlPosition.TOP_RIGHT
               },
               scaleControl: true,
               streetViewControl: false,
               streetViewControlOptions: {
                  position: google.maps.ControlPosition.RIGHT_TOP
               },
               gestureHandling: "greedy",
               fullscreenControl: false
            }
         );
         var uluru = { lat: latInitial, lng: lngInitial };
         marker = new google.maps.Marker( { position: uluru, map: map, icon: carIconInitial } );
         //marker = new google.maps.Marker( { position: uluru, map: map } );
      }
   }, "json");

   var lng = "";
   var lat = "";
   var angle = 0;
   setInterval(function(){
      //$.get("http://localgps.mainor.com/v1/locationdd/now/sn/"+sn, {}, function(res,resp) {
      $.get("http://gps.mainoramg.com/v1/locationdd/now/sn/"+sn, {}, function(res,resp) {
         if( validateCorrectData( res ) )
         {
            lat = res.locations[0].latitude;
            lng = res.locations[0].longitude;
            angle = parseInt(res.locations[0].angle);
            var carIconUpdate = 
            { // car icon
               path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188zM32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336h13.771l2.219,3.336H14.568zM31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
               scale: 0.7,
               fillColor: carColor, //<-- Car Color, you can change it 
               fillOpacity: 1,
               strokeWeight: 1,
               size: new google.maps.Size(25, 50),
               origin: new google.maps.Point(0, 0),
               anchor: new google.maps.Point(12, 25),
               rotation: angle //<-- Car angle
            };
            marker.setIcon( carIconUpdate );
            var newLocation = new google.maps.LatLng( lat, lng );
            map.panTo( newLocation );
            marker.setPosition( newLocation );
            console.log("lat="+lat);
            console.log("lat="+lng);
            console.log("angle="+angle);
         }
      }, "json");
   }, 4*1000);
}

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