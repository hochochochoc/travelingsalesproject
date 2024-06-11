function initMap() {
    // The location of the center point (approximately the center of Spain)
    var centerPoint = { lat: 39.9, lng: -2.34922 };

    // Custom map style to hide cities and streets
    var customMapStyle = [
        {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
        },
        {
            "featureType": "poi",
            "stylers": [{"visibility": "off"}]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{"visibility": "off"}]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
        },
        {
            "featureType": "transit",
            "stylers": [{"visibility": "off"}]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
        },
        {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
        }

        // at some point I should also find out how to change the colors but can't be bothered right now
    ];

    // Create a map object and specify the DOM element for display, with the custom styles.
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5.5,
        center: centerPoint,
        styles: customMapStyle,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
        gestureHandling: 'none'
    });

    function addMarker(location) {
        new google.maps.Marker({
            position: location,
            map: map,
            icon: { url: 'img/pin_icon.png', scaledSize: new google.maps.Size(8, 8) }
        });
    }

    // Add event listener to the button
    document.getElementById('button_find_city').addEventListener('click', function() {
        // lat: 44 top to 36 bottom (8)
        // lon: -10 left to 4.5 right (16) -2.75 for middle (240) +10 /480 * 14.5

        const lat_min = 36;
        const lat_max = 43.5;
        const lng_min = -9.5;
        const lng_max = 5;
        
        for (i = 0; i < 1001; i++) {
            let lat = lat_min + (Math.random() * (lat_max - lat_min));
            let lng = lng_min + (Math.random() * (lng_max - lng_min));
        
        addMarker({ lat: lat, lng: lng });
        }
    });
}
