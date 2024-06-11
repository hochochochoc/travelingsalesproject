// Nearest Neighbor Heuristic
let pathArray = [];
let arrayVectorsPath = [];
console.log(`pathArray first: `);
    console.log(pathArray);
let lines= [];
let allVectors = [];


let calcDistance = (x1, y1, x2, y2) => {
    let distance = 0;
    let differenceX = Math.abs(x2-x1);
    let differenceY = Math.abs(y1-y2);
    
    distance = (Math.sqrt(differenceX ** 2 + differenceY ** 2)).toFixed(2);
    return distance;
}

// Things to do:
// change the draw function so it works with vectors, not points


// no loops, minimum weight 
// it HAS polynominal time algorithms

    // PRIM'S ALGORITHM is used to calculate the MST

    // in findPath after calculateAllVectors(array); => I have an array of all the Vectors

    // starts with random node. ? yes
    // finds nearest node.

    // looks for nearest node from either node already selected, connects.
    // continues like that for all of them.

        // here, the greedy approach does provide the optimal solution
        // and the tree is always a 'lower bound' to the TSP


        // however, it's possible to improve on this lower bound

        // the ONE-TREE where exactly one loop is introduced (9:10)
        // and you can search through all the loops for the largest one
            // getting closer to the actual lower bound/ optimal solution



document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('greedy').addEventListener('click', () => {
        //console.log('arrayRandomCities: ');
        // console.log(arrayRandomCities);
        pathArray = [];
        console.log(`arrayVectorsPath on click: `);
        console.log(arrayVectorsPath);
        if (arrayRandomCities.length > 1) {
            findPath(arrayRandomCities, arrayVectorsPath);
        } else {
            console.error("arrayRandomCities does not have enough elements.");
        }
    });
});

let findPath = (arrayRandomCities, pathArray) => {
    
    console.log('arrayRandomCities: ');
    console.log(arrayRandomCities);

    calculateAllVectors(arrayRandomCities);

    console.log(`pathArray before first vector: `);
    console.log(pathArray);
    
    findFirstVector(arrayRandomCities, allVectors, pathArray);
    
    console.log(`first vector in pathArray: `);
    console.log(pathArray);

    
    // console.log(`pathArray: `);
    // console.log(pathArray);
    // currentCity is really always the last city in the pathArray
    // repeat until only city left is first one in pathArray
    // console.log(`array.length: ${array.length}`)
    
    // for (let i = 0; i < arrayRandomCities.length; i++) { // needs to be updated to until all connected
    //     findNextCity(arrayRandomCities, allVectors, pathArray);
    // } 
    // console.log(`path array after:`);
    // console.log(pathArray);
}

let calculateAllVectors = (arrayRandomCities) => {
    arrayRandomCities.forEach((city) => {
        arrayRandomCities.forEach((otherCity) => {
            if(otherCity != city) {
                let provisionalResult = calcDistance(city.lat,city.lng, otherCity.lat, otherCity.lng);
                // console.log(`Distance between ${city.name} & ${otherCity.name}: ${provisionalResult}`);
                let newEntry = {
                    origin: city.name,
                    destination: otherCity.name,
                    distance: provisionalResult
                }
                allVectors.push(newEntry);
            }
        });
    });
    return allVectors;
}

function findFirstVector (arrayRandomCities, allVectors, pathArray) {
    //console.log(`console logs in findFirstVector: `);
    // console.log(arrayRandomCities);
    // console.log(allVectors);

    let shortestDistance = Infinity;
    let firstVector = '';

    allVectors.forEach(entry => {
        
        if(entry.origin == arrayRandomCities[0].name){
            //console.log(`first condition cleared`);
            //console.log(`entry Origin: ${entry.origin}`);
            //console.log(`arrayRandomCities: ${arrayRandomCities}`);
            if (entry.distance < shortestDistance) {
                // save it somewhere, pointing towards the correct element
                // if shorter, update
                shortestDistance = Number(entry.distance);
                firstVector = entry;
                
                ///console.log('firstVector');
                //console.log(firstVector);
            }    
        } 
    });
    
    if (firstVector) {
        // console.log('final firstVector');
        // console.log(firstVector);
        pathArray.push(firstVector);
    }

    return pathArray;
    // takes first city
    // finds nearest connection
    // spits out the first vector
}


// let findNextCity = (arrayRandomCities, allVectors, pathArray) => {
    
//     let currentShortestDistance = Infinity;
//     let nextCity = '';
//     // find entries where currentCity = origin
//     // console.log('allVectors');
//     // console.log(allVectors);
    
//     allVectors.forEach(entry => {     // shouldn't it be possible to do forEach ... but only if origin is correct? 
//         if(entry.origin == pathArray[(pathArray.length -1)].destination && !pathArray.includes(entry.destination)){
//             console.log(`test next city`);
//             if (entry.distance < currentShortestDistance) {
//                 // save it somewhere, pointing towards the correct element
//                 // if shorter, update
//                 currentShortestDistance = Number(entry.distance);
//                 nextCity = entry;
//             }    
//         }
//     });

//     // First I have to find the first connection for the first city
//     // then algorithm for connecting every other city
//     // then the end


//     // at the end add the destination of the pathArray
//     if (nextCity) {
//         pathArray.push(nextCity);
//     }
//     // console.log(`${pathArray}`);
// }




// now it's time to use the new array to find the fastest way through the points
    // I need a starting point to remember where to go back to
    // points already visited
    // current points too


//findPath(array);



// arrayRandomCities - array with city objects
// pathArray - array with the path
// document.addEventListener('DOMContentLoaded', (event) => {
//     // Function to draw a line from point (x1, y1) to point (x2, y2)
//     function drawLine(x1, y1, x2, y2) {
//         //console.log(`what`);
//         const line = new google.maps.Polyline({
//             path: [
//                 { lat: y1, lng: x1 },
//                 { lat: y2, lng: x2 }
//             ],
//             geodesic: true,
//             strokeColor: 'rgb(0,0,0)',
//             strokeOpacity: 1,
//             strokeWeight: 0.75,
//         });

//         line.setMap(map);
//         lines.push(line);
//     }

//     // Draw line from A to B
//     document.getElementById('draw').addEventListener('click', () => {
//         printArray(pathArray);
//     });


//     let printArray = (pathArray) => {
//         // 1. go through the pathArray 
//         let time = 1500 / pathArray.length;
        
//         for (i = 0; i < (pathArray.length - 1); i++) {
            
//             // first find where in the arrayRandomCities the correct city is
//             let m = findCityIndexOrigin(i);
//             let n = findCityIndexDestination(i+1);

//             let y1 = arrayRandomCities[m].lat;
//             console.log(arrayRandomCities[m].name);
//             console.log(y1);
//             let x1 = arrayRandomCities[m].lng;
//             console.log(x1);

//             let y2 = arrayRandomCities[n].lat;
//             console.log(arrayRandomCities[n].name);
//             console.log(y2);
//             let x2 = arrayRandomCities[n].lng;
//             console.log(x2);
            
            
//             setTimeout(() => {
//                 drawLine(x1, y1, x2, y2);
//             }, i * time);
//         }
    
//         // !!!!!!!!!!! I want this to come at the end obv
//         let m = findCityIndexOrigin(pathArray.length - 1);
//         let n = findCityIndexDestination(0);

//         let y1 = arrayRandomCities[m].lat;
//         let x1 = arrayRandomCities[m].lng;

//         let y2 = arrayRandomCities[n].lat;
//         let x2 = arrayRandomCities[n].lng;
        
        
//         setTimeout(() => {
//             drawLine(x1, y1, x2, y2);
//         }, i * time);
//     }

//     let findCityIndexOrigin = (i) => {
//         return arrayRandomCities.findIndex(city => city.name == pathArray[i].origin);
//     }
//     let findCityIndexDestination = (i) => {
//         return arrayRandomCities.findIndex(city => city.name == pathArray[i].destination);
//     }

// });
