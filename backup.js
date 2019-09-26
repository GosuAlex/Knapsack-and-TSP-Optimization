console.log("heres the rangesum: " + sumRangeInArray(arr, 0, 49));
let range = arr.slice(0, 49);
let testdistance = range.reduce((total, value) => Number(total) + Number(value));
console.log(range);
console.log("heres the dist: " + testdistance);


console.log(visitedCities[(visitedCities.length - 1)]);
console.log("her :" + arr[visitedCities[(visitedCities.length - 1)]]);
console.log(distance);
console.log("new : " + newCity);

console.log(start +"sumr"+ end);

setTimeout( () => console.log("timer done"), 1000 )
setTimeout( () => console.log("timer done"), randomDelay() )