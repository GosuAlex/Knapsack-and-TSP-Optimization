/*
Compulsory Assignment 1

In this assignment , we are going to solve the travelling salesman problem.
The number of cities is a graph  having 500. Each city is connected to all remaining cities. This means that a graph with 20 cities will have 19 edges.

1:  Calculate an initial solution using random method, iterative random method, and greedy method.
2:  Improve  each  starting solution using greedy improvement and greedy random algorithm.
3:  Run you algorithm  with 50 , 100, 250, 500 cities. What are your conclusions.
*/

/*
Greedy Heuristic:
Generate an initial tour using a chosen construction algorithm ;

while ( !stop ){
choose a random city C_1;
choose a random city C_2;
Exchange their locations; 
if ( length of the tour is improved ) {
  accept the current tour ; else keep the previous the tour ;
}

//Implementasjon av Stop criterion:
//Number of  Iterations
//Time
//If during a number of consecutive iterations no improvement is achived.

*/

arr = [
[0, 63, 75, 10, 76, 32, 96, 68, 47, 66],
[63, 0, 22, 32, 29, 85, 35, 60, 82, 18],
[75, 22, 0, 5, 76, 66, 63, 48, 45, 54],
[10, 32, 5, 0, 2, 54, 27, 74, 9, 70],
[76, 29, 76, 2, 0, 54, 46, 20, 2, 7],
[32, 85, 66, 54, 54, 0, 78, 52, 91, 89],
[96, 35, 63, 27, 46, 78, 0, 94, 40, 47],
[68, 60, 48, 74, 20, 52, 94, 0, 92, 71],
[47, 82, 45, 9, 2, 91, 40, 92, 0, 21],
[66, 18, 54, 70, 7, 89, 47, 71, 21, 0]
];
console.log(arr[0]);
console.log(arr[1]);
console.log(arr[2]);
console.log(arr[3]);
console.log(arr[4]);
console.log(arr[5]);
console.log(arr[6]);
console.log(arr[7]);
console.log(arr[8]);
console.log(arr[9]);

let visitedCitiesInit = [5, 4, 2, 1, 8, 0, 9, 6, 3, 7];
let distanceInit = 1887;
console.log(visitedCitiesInit + " = " + distanceInit);
  
function greedyImprovement(visitedCitiesInit, distanceInit) {
  let visitedCities = [...visitedCitiesInit];
  let visitedCitiesNew = null;
  let distance = distanceInit;
  let times = 10;
  
  while (times > 0) {
    let cityOne = [(Math.floor(Math.random() * arr.length))];
    let cityTwo = [(Math.floor(Math.random() * arr.length))];
    while (cityOne == cityTwo) {
      cityTwo = [(Math.floor(Math.random() * arr.length))];
    }
    
    let distanceNew = null;
    visitedCitiesNew = [...visitedCities];
    visitedCitiesNew[cityOne] = visitedCities[cityTwo];
    visitedCitiesNew[cityTwo] = visitedCities[cityOne];
    console.log("old: " + visitedCities + " new: " + visitedCitiesNew);
    
    for (let i = visitedCitiesNew.length; i >= 2; i--) {
      distanceNew += sumRangeInArray(arr[visitedCitiesNew[(visitedCitiesNew.length - i)]], visitedCitiesNew[(visitedCitiesNew.length - i)], visitedCitiesNew[(visitedCitiesNew.length - (i-1))]);
      console.log(distanceNew);
    }
    
    if (distanceNew <= distance) {
      distance = distanceNew;
      visitedCities = visitedCitiesNew;
    }
    
    console.log(distanceNew);
    console.log(distance);
  
    times--;
  }

  console.log(visitedCities);
  console.log(arr);
  console.log(`${distance} is ${distanceInit - distance} points better than the init solution.`);
}
  
greedyImprovement(visitedCitiesInit, distanceInit);

/*
Greedy Random Method:

Old-Cost = Initial-Cost; 
Old-Solution = Initial-Solution;
Best-Cost = Old-Cost;
Best-Solution = Old-Solution; 

Do {
  For ( counter = 0; counter <MaxTries; counter++) {
    Perturb the current solution;
    Compute New-Cost;
    // Greedy Part
    if ( New-Cost is better than Old-Cost ) {
      Old-Cost = New-Cost;
      Old-Solution = New-Solution;
      if  ( New-Cost is better than  Best-Cost ) {
        Best-Cost = New-Cost;
        Best-Solution = New-Solution;
      }
    } else {
      rnd = ( random ( ) % 100) / 100);
      if ( rnd > Probability-of-acccpetance ) {
        Old-Cost = New-Cost;
        Old-Solution = New-Solution;
      }
    }
  }
  Probability-of-acceptance = 0.9 * Probability-of-acceptance;
} While ( Probability > 0.0000001)

return ( Best-Cost )
return ( Best-Solution )
*/

arr = [
[0, 63, 75, 10, 76, 32, 96, 68, 47, 66],
[63, 0, 22, 32, 29, 85, 35, 60, 82, 18],
[75, 22, 0, 5, 76, 66, 63, 48, 45, 54],
[10, 32, 5, 0, 2, 54, 27, 74, 9, 70],
[76, 29, 76, 2, 0, 54, 46, 20, 2, 7],
[32, 85, 66, 54, 54, 0, 78, 52, 91, 89],
[96, 35, 63, 27, 46, 78, 0, 94, 40, 47],
[68, 60, 48, 74, 20, 52, 94, 0, 92, 71],
[47, 82, 45, 9, 2, 91, 40, 92, 0, 21],
[66, 18, 54, 70, 7, 89, 47, 71, 21, 0]
];
console.log(arr[0]);
console.log(arr[1]);
console.log(arr[2]);
console.log(arr[3]);
console.log(arr[4]);
console.log(arr[5]);
console.log(arr[6]);
console.log(arr[7]);
console.log(arr[8]);
console.log(arr[9]);

let visitedCitiesInit = [5, 4, 2, 1, 8, 0, 9, 6, 3, 7];
let distanceInit = 1887;
console.log(visitedCitiesInit + " = " + distanceInit);

function greedyRandom(visitedCitiesInit, distanceInit) {
  let visitedCities = [...visitedCitiesInit];
  let visitedCitiesNew = null;
  let visitedCitiesBest = null;
  let distance = distanceInit;
  let distanceBest = distanceInit;
  let times = 5;
  let acceptanceProbability = 0.9;

  do {
    for (let i = times; i > 0; i--) {
      let cityOne = [(Math.floor(Math.random() * arr.length))];
      let cityTwo = [(Math.floor(Math.random() * arr.length))];
      while (cityOne == cityTwo) {
        cityTwo = [(Math.floor(Math.random() * arr.length))];
      }
    
      let distanceNew = null;
      visitedCitiesNew = [...visitedCities];
      visitedCitiesNew[cityOne] = visitedCities[cityTwo];
      visitedCitiesNew[cityTwo] = visitedCities[cityOne];
      console.log("old: " + visitedCities + " new: " + visitedCitiesNew);
    
      for (let i = visitedCitiesNew.length; i >= 2; i--) {
        distanceNew += sumRangeInArray(arr[visitedCitiesNew[(visitedCitiesNew.length - i)]], visitedCitiesNew[(visitedCitiesNew.length - i)], visitedCitiesNew[(visitedCitiesNew.length - (i-1))]);
        console.log(distanceNew);
      }
      
      if (distanceNew <= distance) {
        distance = distanceNew;
        visitedCities = visitedCitiesNew;
        if (distanceNew <= distanceBest) {
          distanceBest = distanceNew;
          visitedCitiesBest = visitedCitiesNew;
        }
      } else {
        if (Math.random() > acceptanceProbability) {
          distance = distanceNew;
          visitedCities = visitedCitiesNew;
        }
      }
    }
    acceptanceProbability = acceptanceProbability * 0.9;
    console.log("prob: " + acceptanceProbability)
    console.log(distanceInit);
    console.log(distanceBest);
    } while (acceptanceProbability > 0.1); 

  console.log(visitedCitiesBest);
  console.log(arr);
  console.log(`${distanceBest} is ${distanceInit - distanceBest} points better than the init solution.`);
}






