// Nearest Neighbor Heuristic

let calcDistance = (x1, y1, x2, y2) => {
    let distance = 0;
    let differenceX = Math.abs(x2-x1);
    let differenceY = Math.abs(y1-y2);
    
    distance = (Math.sqrt(differenceX ** 2 + differenceY ** 2)).toFixed(2);
    return distance;
}



document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('greedy').addEventListener('click', () => {
        console.log(arrayRandomCities);
        if (arrayRandomCities.length > 1) {
            let result = calcDistance(arrayRandomCities[0].lat, arrayRandomCities[0].lng, arrayRandomCities[1].lat, arrayRandomCities[1].lng);
            console.log(result);
            findPath(arrayRandomCities);
        } else {
            console.error("arrayRandomCities does not have enough elements.");
        }
    });
});




let allDistances = [];

let calculateAllDistances = (array) => {
    array.forEach((city) => {
        // console.log(`City name: ${city.name}`);

        array.forEach((otherCity) => {
            if(otherCity != city) {
                let provisionalResult = calcDistance(city.lat,city.lng, otherCity.lat, otherCity.lng);
                // console.log(`Distance between ${city.name} & ${otherCity.name}: ${provisionalResult}`);
                let newEntry = {
                    origin: city.name,
                    destination: otherCity.name,
                    distance: provisionalResult
                }
                allDistances.push(newEntry);
            }
        });
    });
    // console.log(`allDistances: `);
    // allDistances.forEach(entry => {
    //     console.log(`entry.origin: ${entry.origin}\nentry.destination: ${entry.destination}\nentry.distance: ${entry.distance}`);
    // });
    return allDistances;
}

let pathArray = [];

let findPath = (array) => {
    calculateAllDistances(array);
    let firstCity = array[0].name;
    pathArray = [firstCity];
    // console.log(pathArray);
    // currentCity is really always the last city in the pathArray
    // repeat until only city left is first one in pathArray
    // console.log(`array.length: ${array.length}`)
    for (let i = 0; i < array.length; i++) {
        findNextCity(allDistances, pathArray);
    } 
    console.log(`${pathArray}`);
}

let findNextCity = (allDistances, pathArray) => {
    let currentShortestDistance = Infinity;
    let nextCity = '';
    // find entries where currentCity = origin
    
    allDistances.forEach(entry => {     // shouldn't it be possible to do forEach ... but only if origin is correct? 
        
        // console.log(`!pathArray.includes(entry.destination)${!pathArray.includes(entry.destination)}: ${entry.destination}`);
        // console.log(`entry.origin: ${entry.origin}`);
        // console.log(`entry.origin: ${pathArray[(pathArray.length -1)]}`);

        if(entry.origin == pathArray[(pathArray.length -1)] && !pathArray.includes(entry.destination)){
            // console.log(`entry.origin: ${entry.origin}`);
            // console.log(`last element array: ${pathArray[(pathArray.length -1)]}`);
            // console.log(`match found`);
            // compare that save to the new discovery...
            // console.log(`City looked at: ${entry.origin}\nDestination: ${entry.destination}\nOld distance: ${currentShortestDistance}\nDistance this entry: ${entry.distance} `);
            // console.log(`shorter? ${entry.distance < currentShortestDistance}`);
            if (entry.distance < currentShortestDistance) {
                // save it somewhere, pointing towards the correct element
                // if shorter, update
                // console.log(`City looked at: ${entry.origin}\nDestination: ${entry.destination}\nOld distance: ${currentShortestDistance}\nDistance this entry: ${entry.distance} `);
                currentShortestDistance = Number(entry.distance);
                nextCity = entry.destination;
            }    
            // console.log(`new currentShortestDistance: ${currentShortestDistance}`);
            // console.log(`next city: ${nextCity}`);
        }
    });
    // at the end add the destination of the pathArray
    if (nextCity) {
        pathArray.push(nextCity);
    }
    // console.log(`${pathArray}`);
}


// now it's time to use the new array to find the fastest way through the points
    // I need a starting point to remember where to go back to
    // points already visited
    // current points too


//findPath(array);


