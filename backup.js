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
/*
 012345 i
0=QWERT
1Q=E		(in j: check if same iteration on i has value)
2WE=		(in j: on E checks if same iteration on i has, and -1 on j has value)
3   =
4    =
5     =

j


for (int i = 0; i < N; i++) 
for (int j = 0; j < N; j++) 
    if (mat[i][j] != mat[j][i]) 
        return false; 



*/


