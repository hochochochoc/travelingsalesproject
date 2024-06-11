let lines= [];
// arrayRandomCities - array with city objects
// pathArray - array with the path
document.addEventListener('DOMContentLoaded', (event) => {
    // Function to draw a line from point (x1, y1) to point (x2, y2)




    function drawLine(x1, y1, x2, y2) {
        //console.log(`what`);
        const line = new google.maps.Polyline({
            path: [
                { lat: y1, lng: x1 },
                { lat: y2, lng: x2 }
            ],
            geodesic: true,
            strokeColor: 'rgb(0,0,0)',
            strokeOpacity: 1,
            strokeWeight: 0.75,
        });

        line.setMap(map);
        lines.push(line);
    }

    // Draw line from A to B
    document.getElementById('draw').addEventListener('click', () => {
        printArray(pathArray);
    });


    let printArray = (pathArray) => {
        // 1. go through the pathArray 
        let time = 1500 / pathArray.length;
        
        for (i = 0; i < (pathArray.length - 1); i++) {
            
            // first find where in the arrayRandomCities the correct city is
            let m = findCityIndex(i);
            let n = findCityIndex(i+1);

            let y1 = arrayRandomCities[m].lat;
            console.log(arrayRandomCities[m].name);
            console.log(y1);
            let x1 = arrayRandomCities[m].lng;
            console.log(x1);

            let y2 = arrayRandomCities[n].lat;
            console.log(arrayRandomCities[n].name);
            console.log(y2);
            let x2 = arrayRandomCities[n].lng;
            console.log(x2);
            
            
            setTimeout(() => {
                drawLine(x1, y1, x2, y2);
            }, i * time);
        }
    
        // !!!!!!!!!!! I want this to come at the end obv
        let m = findCityIndex(pathArray.length - 1);
        let n = findCityIndex(0);

        let y1 = arrayRandomCities[m].lat;
        let x1 = arrayRandomCities[m].lng;

        let y2 = arrayRandomCities[n].lat;
        let x2 = arrayRandomCities[n].lng;
        
        
        setTimeout(() => {
            drawLine(x1, y1, x2, y2);
        }, i * time);
    }

    let findCityIndex = (i) => {
        return arrayRandomCities.findIndex(city => city.name == pathArray[i])
    }

});
