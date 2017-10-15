// import Map from './modules/Map';

// var map = new Map();



function init_map() {
    let selectorMapElement = document.getElementById('gmap_canvas');
    let googleMapTitle = "Zurb";
    var googleMapAddress="100 W Rincon Ave, Campbell, CA 95008";
    let googleMapLat = 37.2847678;
    let googleMapLong = -121.9536827;
    var myOptions = {
        zoom: 13,
        center: new google.maps.LatLng(googleMapLat, googleMapLong),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    infowindow = new google.maps.InfoWindow({
        content: `
          <strong>${googleMapTitle}</strong>
          <br>${googleMapAddress}<br>
        `
    });
    map = new google.maps
      .Map(selectorMapElement, myOptions);
    marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(googleMapLat, googleMapLong)
    });
    infowindow.open(map, marker);
    // google.maps.event.addListener(marker, 'click', function() {
    //     infowindow.open(map, marker);
    // });
}
google.maps.event.addDomListener(window, 'load', init_map);
