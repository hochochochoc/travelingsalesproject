let map;
let arrayRandomCities = [];
const data_cities = [];
let markers = [];

function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


function getMapSizeByScreen() {
    let screenWidth = window.innerWidth;
    let chosenCountry = getParameterByName('chosenCountry') || 'Brazil';
    let centerPoint, zoomLevel, cityVS;

    if (chosenCountry == 'Spain') {
        centerPoint = { lat: 39.9, lng: -2.34922 }; 
        zoomLevel = screenWidth > 1024 ? 6.3 : screenWidth > 768 ? 6.0 : 5.0;
        cityVS = 'es.csv';
    } else if (chosenCountry == 'Brazil') {
        centerPoint = { lat: -15.5, lng: -51.925 };
        zoomLevel = screenWidth > 1024 ? 4.3 : screenWidth > 768 ? 4.0 : 3.25;
        cityVS = 'br.csv';
    } else if (chosenCountry == 'China') {
        centerPoint = { lat: 37.8, lng: 104.2 };
        zoomLevel = screenWidth > 1024 ? 4.2 : screenWidth > 768 ? 3.87 : 2.8;
        cityVS = 'cn.csv';
    }

    return { centerPoint, zoomLevel, cityVS };
}


function initMap() {
    // The location of the center point (approximately the center of Spain)
    
    
    arrayRandomCities = [];
    data_cities.length = 0;
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    lines.forEach(line => line.setMap(null));
    lines = [];
    
    
    
    
    let { centerPoint, zoomLevel, cityVS } = getMapSizeByScreen();
    
    
    
    
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
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoomLevel,
        center: centerPoint,
        styles: customMapStyle,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
        gestureHandling: 'none'
    });

    fetch(cityVS)
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                complete: function(results) {
                    data_cities.length = 0; 
                    parseCityData(results);
                }
            });
        });

    document.getElementById('button_find_city').addEventListener('click', () => {
        let numberOfCities = Number(document.getElementById('number_of_cities').value);
        calcRandomCity(numberOfCities);
    });
    
} 





let parseCityData =(results) => {
    results.data.forEach((result) => {
        let name = result.city;
        let latitude = parseFloat(result.lat);
        let longitude = parseFloat(result.lng);
        let population = parseInt(result.population);
        let admin_name = result.admin_name;

        data_cities.push({ name, latitude, longitude, population, admin_name });
    });    
}

let calcRandomCity = (number) => {
    const MAX_ATTEMPTS = 1000;
    let attempts = 0;
    
    for(let i = 0; i < number; i++) {
        if (attempts >= MAX_ATTEMPTS) {
            break;
        }
        let random1 = data_cities[Math.floor(Math.random() * (data_cities.length))];
        // console.log(random1);
        // console.log(data_cities.length);
        if (random1.admin_name !== 'Catallunia') {
            if (arrayRandomCities.some(city => city.name === random1.name)) {
                i--;
                attempts++;
                
            } else {
                let coordinates = {
                    name: random1.name,
                    lat: random1.latitude,
                    lng: random1.longitude,
                    population: Math.round(random1.population/100)*100
                };
                arrayRandomCities.push(coordinates);
                // console.log(`city name: ${coordinates.name}`);
                addMarker({ lat: coordinates.lat, lng: coordinates.lng }, coordinates.name);
            }  
        } else {
            i--;
            attempts++;
        }
    }
}



function addMarker(location, name) {
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: { url: 'img/pin_icon.png', 
        scaledSize: new google.maps.Size(12, 12) },
        label: {
            text: name,
            color: 'black', 
            fontSize: '14px', 
            className: 'custom-label'
        }
    });
    markers.push(marker);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('goBack').addEventListener('click', function() {
        window.location.href = 'index.html'; 
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('refresh').addEventListener('click', () => {
        this.location.reload();
    });
});

// when generating, add to array; before confirming look if already in array, if within certain distance...

// make search process faster...

// when approving random cities make sure that there's a distance to every other chosen city

//Async/Await for file reading???

// use the real maps map

// responsive

// phone screen

// make it so I can take it around on my phone
