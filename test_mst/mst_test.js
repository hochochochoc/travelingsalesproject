let allDistances = [];
let pathArray = [];


// Nearest Neighbor Heuristic - updated output

// Input: arrayRandomCities - What does that look like here?
// 

let arrayRandomCities = [
    {
        name: 'Badajoz',
        lat: 38.8803,
        lng: -6.9753,
        population: 150190
    },
    {
        name: 'Sevilla',
        lat: 37.3900,
        lng: -5.9900,
        population: 684025
    },
    {
        name: 'Málaga',
        lat: 36.7194,
        lng: -4.4200,
        population: 586384
    },
    {
        name: 'Granada',
        lat: 37.1781,
        lng: -3.6008,
        population: 230595
    },
    
];
console.log(arrayRandomCities);

let initialization = () => {
    if (arrayRandomCities.length > 1) {
        findPath(arrayRandomCities);
    } else {
        console.error("arrayRandomCities does not have enough elements.");
    }
}

let findPath = (array) => {
    calculateAllDistances(array);
    
    // I want the pathArray to be full of vectors, not individual cities

    let firstCity = array[0];
    console.log(firstCity);
    
    // calculate first vector from this city
    pathArray = calculateFirstVector(firstCity, array);
    console.log(pathArray);
    
    
    // for (let i = 0; i < array.length; i++) {
    //     findNextCity(allDistances, pathArray, allDistances);
    // } 
    // console.log(`${pathArray}`);
}

let calculateFirstVector = (firstCity, allDistances) => {
    let firstVector = '';
    let currentShortestDistance = Infinity;

    allDistances.forEach(entry => {  
        console.log(`first condition:`);
        console.log(entry.origin);
        console.log(firstCity.name);
        if(entry.origin == firstCity.name){
            console.log(`first condition met`);
            if (entry.distance < currentShortestDistance) {
                currentShortestDistance = Number(entry.distance);
                firstVector = entry;
            }
        }
    });

    if (firstVector) {
        pathArray.push(firstVector);
        console.log(firstVector);
    }
}



let calculateAllDistances = (array) => {
    allDistances = [];
    console.log(`allDistances`);
    console.log(allDistances);
    array.forEach((city) => {
        array.forEach((otherCity) => {
            if(otherCity != city) {
                let provisionalResult = calcDistance(city.lat,city.lng, otherCity.lat, otherCity.lng);
                let newEntry = {
                    origin: city.name,
                    destination: otherCity.name,
                    distance: provisionalResult
                }
                allDistances.push(newEntry);
            }
        });
    });
    return allDistances;
}

let calcDistance = (x1, y1, x2, y2) => {
    let distance = 0;
    let differenceX = Math.abs(x2-x1);
    let differenceY = Math.abs(y1-y2);
    distance = (Math.sqrt(differenceX ** 2 + differenceY ** 2)).toFixed(2);
    return distance;
}

let findNextCity = (allDistances, pathArray) => {
    let currentShortestDistance = Infinity;
    let nextCity = '';

    allDistances.forEach(entry => {     
        if(entry.origin == pathArray[(pathArray.length -1)] && !pathArray.includes(entry.destination)){
            
            if (entry.distance < currentShortestDistance) {
                currentShortestDistance = Number(entry.distance);
                nextCity = entry.destination;
            }    
        }
    });
    if (nextCity) {
        pathArray.push(nextCity);
    }
}



initialization();










