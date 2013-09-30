var directionDisplay;
var directionsService = new google.maps.DirectionsService();     //Create a DirectionsService object which is required to communicate with the Google Maps API Direction Service
var map;
function initialize()
{
            directionsDisplay = new google.maps.DirectionsRenderer();        //Create a DirectionsRenderer object to render the directions results
    var center = new google.maps.LatLng(0, 0);    //Map is centered at 0,0
    var myOptions =
    {
            zoom:7,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: center
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    directionsDisplay.setMap(map);
    var start = "Kansas";     //Set the source/ origin
    var end = "Texas";  //Set the destination
    var request =
    {
            origin:start,
            destination:end,
            travelMode: google.maps.DirectionsTravelMode.DRIVING          //Current travel mode is DRIVING. You can change to BICYCLING or WALKING and see the changes.
    };
    directionsService.route(request, function(response, status)
    {
            if (status == google.maps.DirectionsStatus.OK) //Check if request is successful.
            {
            directionsDisplay.setDirections(response);         //Display the directions result
            }
    });

ryan.getTwitter = function()
{
    removeLayer();
    bounds = new google.maps.LatLngBounds ();
    $.getJSON('http://search.twitter.com/search.json?rpp=25&amp;geocode='+map.getCenter().lat()+','+map.getCenter().lng()+',20mi&amp;callback=?',
        function(data)
        {
            $.each(data.results, function(i,item){
                if (item.geo == null)
                {
                trace(i + ' no geo data');
                }
                else
                {
                infoWindowContent = '<strong>'+item.from_user+'</strong><br>';
                infoWindowContent += '<img src="'+item.profile_image_url+'"></a><br>';
                infoWindowContent += ''+item.text+'';
ryan.createTwitterMarker(i,item.geo.coordinates[0],item.geo.coordinates[1],infoWindowContent,item.profile_image_url);
                }    
            });
        });
}
createTwitterMarker = function(i,latitude,longitude,infoWindowContent,icon)
{
    var markerLatLng = new google.maps.LatLng(latitude,longitude);  

    //extent bounds for each Tweet and adjust map to fit to it
    bounds.extend(markerLatLng);
    map.fitBounds(bounds);
    var image = new google.maps.MarkerImage(icon, null, null, null, new google.maps.Size(32,32));

    twitter[i] = new google.maps.Marker({
        position: markerLatLng,
        map: map,
        title: infoWindowContent,
        icon: image
        });

    //add an onclick event
    google.maps.event.addListener(twitter[i], 'click', function() {
        infowindow.setContent(infoWindowContent);
        infowindow.open(map,twitter[i]);
        });
}
ryan.getTwitter = function()
{
    removeLayer();
    bounds = new google.maps.LatLngBounds ();
    $.getJSON('http://search.twitter.com/search.json?rpp=25&amp;geocode='+map.getCenter().lat()+','+map.getCenter().lng()+',20mi&amp;callback=?',
        function(data)
        {
            $.each(data.results, function(i,item){
                if (item.geo == null)
                {
                infoWindowContent = '<strong>'+item.from_user+'</strong><br>';
                infoWindowContent += '<img src="'+item.profile_image_url+'"></a><br>';
                infoWindowContent += ''+item.text+'';
                ryan.geocodeTwitter(i,item.location,infoWindowContent,item.profile_image_url);
                }
                else
                {
                infoWindowContent = '<strong>'+item.from_user+'</strong><br>';
                infoWindowContent += '<img src="'+item.profile_image_url+'"></a><br>';
                infoWindowContent += ''+item.text+'';
ryan.createTwitterMarker(i,item.geo.coordinates[0],item.geo.coordinates[1],infoWindowContent,item.profile_image_url);
                }    
            });
        });
}
ryan.geocodeTwitter = function(i,genLocation,infoWindowContent,icon) 
{
    var geocoderRequest = {address: genLocation}
    geocoder.geocode(geocoderRequest, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) 
        {
ryan.createTwitterMarker(i,results[0].geometry.location.Da,results[0].geometry.location.Ea,infoWindowContent,icon);
            trace(i + ' lat/long');
            trace(results[0].geometry.location);
        } 
        else 
        {
            trace("Geocode was not successful for the following reason: " + status);
        }
    });
}
}