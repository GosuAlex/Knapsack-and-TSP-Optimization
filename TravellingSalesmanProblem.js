/*
Compulsory Assignment 1

In this assignment , we are going to solve the travelling salesman problem.
The number of cities is a graph  having 500. Each city is connected to all remaining cities. This means that a graph with 20 cities will have 19 edges.

1:  Calculate an initial solution using random method, iterative random method, and greedy method.
2:  Improve  each  starting solution using greedy improvement and greedy random algorithm.
3:  Run you algorithm  with 50 , 100, 250, 500 cities. What are your conclusions.
*/

function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function sumRangeInArray(arr, start, end) {
  if (start > end) {
    [start, end] = [end, start];
  } 
  return arr.slice(start, end+1).reduce((total, value) => Number(total) + Number(value))
}

// symmetric adjacency matrix 
function genAdjSymMatrix(cities, maxPossibleDistance) {

  let arr = [[0]];
  for (let i = 1; i < cities; i++) {
    arr[0].push(randomNumber(maxPossibleDistance));
  }

  for (let i = 1; i < cities; i++) {
    
    arr[i] = [];
    let j = 0;
    
    while(i != j) {
      arr[i].push(arr[j][i]);
      j++
    }
    
    arr[i].push(0);
    j++;
    
    while(j < cities) {
      arr[i].push(randomNumber(maxPossibleDistance));
      j++;
    }
    
  }
  
  return arr;
}

function printer(text) {
  //var ElementP = document.createElement("p");
  var ElementP = document.createElement("span");
  //ElementP.innerText = text;
  ElementP.innerHTML = text + "<br/>";
  document.body.appendChild(ElementP);
}

const arr = genAdjSymMatrix(10, 100);

/*
Random Method (A totally random tour can be generated as follows):

Choose  a random starting city. Mark this city as visited
While ( all cities not visisted ) {
  start: Choose a random city;
  Mark it visited;
  Connect it to the previous chosen city;
}
*/

function random() {
  let visitedCities = [(Math.floor(Math.random() * arr.length))];

  let newCity = null;
  let distance = 0;

  while (visitedCities.length <= arr.length - 1) {
    newCity = Math.floor(Math.random() * arr.length);
    if (!visitedCities.includes(newCity)) {
      distance += arr[visitedCities[(visitedCities.length - 1)]][newCity];
      visitedCities.push(newCity);
      //console.log("each step distance: " + distance);
    }
  }
  // Go back to startpoint at the end.
  distance += arr[visitedCities[(visitedCities.length - 1)]][visitedCities[0]];
  visitedCities.push(visitedCities[0]);

  console.log(visitedCities);
  console.log(arr);
  console.log(distance);
}

/*
Iterative Random Method:

while (!stop ) {
  Choose  a random starting city;
  Mark this city as visited;
    While ( all cities not visisted ) {
      Choose a random city;
      Mark it visited;
      Connect it to the previous chosen city;
    }  
}
return  (the best tour  found );
*/

function iterativeRandom() {
  let times = 100;
  let bestDistance = Infinity;
  let bestRoute = null;
  
  while (times > 0) {
    let visitedCities = [(Math.floor(Math.random() * arr.length))];

    let newCity = null;
    let distance = 0;

    while (visitedCities.length <= arr.length - 1) {
      newCity = Math.floor(Math.random() * arr.length);
      if (!visitedCities.includes(newCity)) {
        //distance += sumRangeInArray(arr[visitedCities[(visitedCities.length - 1)]], visitedCities[(visitedCities.length - 1)], newCity);
        distance += arr[visitedCities[(visitedCities.length - 1)]][newCity];
        visitedCities.push(newCity);
        //console.log("each step distance: " + distance);
      }
    }

    // Go back to startpoint at the end.
    distance += arr[visitedCities[(visitedCities.length - 1)]][visitedCities[0]];
    visitedCities.push(visitedCities[0]);
    
    //console.log("each route & distance: " + distance + " " + visitedCities);
    let text = visitedCities + " " + distance;
    printer(text);

    if (bestDistance > distance) {
      bestDistance = distance;
      bestRoute = visitedCities;
    }

    times--;
  }

  console.log(bestRoute);
  console.log(arr);
  console.log(bestDistance);
}

/*
Greedy Method:

Choose a city in a  random manner;
Mark it visited;
while ( all the cities not visited ) {
  Identify the unvisited nearest city to the previous visited city;
  Mark it visited;
  Connect it to the previous visited city;
}
*/

function greedy() {
  let visitedCities = [(Math.floor(Math.random() * arr.length))];
  let distance = 0;
  
  let newCity = null;
  let cityFilter = new Set([]);
  //let cityFilter = [];

  while (visitedCities.length <= arr.length - 1) {
    //newCity = arr[visitedCities[(visitedCities.length - 1)]].indexOf(Math.min(...visitedCities[(visitedCities.length - 1)]));
    //console.log("arr " + arr[visitedCities[(visitedCities.length - 1)]]);
    let possibleCities = [...arr[visitedCities[(visitedCities.length - 1)]]];
    
    newCity = possibleCities.indexOf(Math.min(...possibleCities));
    
    while (cityFilter.has(newCity) || !Boolean(possibleCities[newCity])) {
      //console.log("while " + newCity);
      
      cityFilter.add(newCity);
      possibleCities[newCity] = Infinity;
      newCity = possibleCities.indexOf(Math.min(...possibleCities));
    }

    if (!cityFilter.has(newCity) && Boolean(possibleCities[newCity])) {
      //console.log("if " + newCity);
      distance += arr[visitedCities[(visitedCities.length - 1)]][newCity];
      visitedCities.push(newCity);
    } 
    
    //console.log(cityFilter);
    //console.log([...cityFilter]);
    //console.log(distance);

    //break;
  }
  
  distance += arr[visitedCities[(visitedCities.length - 1)]][visitedCities[0]];
  visitedCities.push(visitedCities[0]);

  //console.log(arr);
  console.log(visitedCities);
  console.log(distance);
  
  console.log("init end");
  
  //greedyRandom(visitedCities, distance);
}



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
    let distanceNew = null;
    let times = 2100;
    
    while (times > 0) {
      let cityOne = [(Math.floor(Math.random() * arr.length))];
      let cityTwo = [(Math.floor(Math.random() * arr.length))];
      while (cityOne == cityTwo) {
        cityTwo = [(Math.floor(Math.random() * arr.length))];
      }
      
      distanceNew = null;
      visitedCitiesNew = [...visitedCities];
      visitedCitiesNew.pop();
      visitedCitiesNew[cityOne] = visitedCities[cityTwo];
      visitedCitiesNew[cityTwo] = visitedCities[cityOne];
      //console.log("old: " + visitedCities + " new: " + visitedCitiesNew);
      
      for (let i = visitedCitiesNew.length; i >= 2; i--) {
        distanceNew += arr[visitedCitiesNew[(visitedCitiesNew.length - i)]][visitedCitiesNew[(visitedCitiesNew.length - (i-1))]];
        //console.log(distanceNew);
      }
      distanceNew += arr[visitedCitiesNew[(visitedCitiesNew.length - 1)]][visitedCitiesNew[0]];
      visitedCitiesNew.push(visitedCitiesNew[0]);
      
      if (distanceNew <= distance) {
        distance = distanceNew;
        visitedCities = visitedCitiesNew;
      }
      
      //console.log(distanceNew);
      console.log(distance);
    
      times--;
    }
    
    routeUlti = visitedCities;
    distanceUlti = distance;
    distanceUltiInit = distanceInit;
  
    console.log(visitedCities);
    //console.log(arr);
    console.log(`${distance} is ${distanceInit - distance} points better than the init solution. ${distanceInit}`);
  }
    
  //greedyImprovement(visitedCitiesInit, distanceInit);
  
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
  /*
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
  */
  
  
  arr = [
  [0, 29, 20, 21, 16, 31, 100, 12, 4, 31, 18],
  [29, 0, 15, 29, 28, 40, 72, 21, 29, 41, 12],
  [20, 15, 0, 15, 14, 25, 81, 9, 23, 27, 13],
  [21, 29, 15, 0, 4, 12, 92, 12, 25, 13, 25],
  [16, 28, 14, 4, 0, 16, 94, 9, 20, 16, 22],
  [31, 40, 25, 12, 16, 0, 95, 24, 36, 3, 37],
  [100, 72, 81, 92, 94, 95, 0, 90, 101, 99, 84],
  [12, 21, 9, 12, 9, 24, 90, 0, 15, 25, 13],
  [4, 29, 23, 25, 20, 36, 101, 15, 0, 35, 18],
  [31, 41, 27, 13, 16, 3, 99, 25, 35, 0, 38],
  [18, 12, 13, 25, 22, 37, 84, 13, 18, 38, 0]
  ];
  let optimalDist = 0;
  optimalDist += arr[0][7];
  optimalDist += arr[7][4];
  optimalDist += arr[4][3];
  optimalDist += arr[3][9];
  optimalDist += arr[9][5];
  optimalDist += arr[5][2];
  optimalDist += arr[2][6];
  optimalDist += arr[6][1];
  optimalDist += arr[1][10];
  optimalDist += arr[10][8];
  //optimalDist += arr[8][0];
  console.log("ultimate test: " + optimalDist);
  console.log("optimal: 0-7-4-3-9-5-2-6-1-10-8-0 = 253");
  
  
  
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
    let times = 100;
    let acceptanceProbability = 0.9;
  
    do {
      for (let i = times; i > 0; i--) {
  
        let distanceNew = null;
        visitedCitiesNew = [...visitedCities];
        visitedCitiesNew.pop();
  
        let cityOne = [(Math.floor(Math.random() * arr.length))];
        let cityTwo = [(Math.floor(Math.random() * arr.length))];
        while (cityOne == cityTwo) {
          cityTwo = [(Math.floor(Math.random() * arr.length))];
        }
      
        visitedCitiesNew[cityOne] = visitedCities[cityTwo];
        visitedCitiesNew[cityTwo] = visitedCities[cityOne];
        console.log("old: " + visitedCities + " new: " + visitedCitiesNew);
      
        for (let i = visitedCitiesNew.length; i >= 2; i--) {
          //distanceNew += sumRangeInArray(arr[visitedCitiesNew[(visitedCitiesNew.length - i)]], visitedCitiesNew[(visitedCitiesNew.length - i)], visitedCitiesNew[(visitedCitiesNew.length - (i-1))]);
          distanceNew += arr[visitedCitiesNew[(visitedCitiesNew.length - i)]][visitedCitiesNew[(visitedCitiesNew.length - (i-1))]];
          console.log(distanceNew);
        }
        // Go back to startpoint at the end.
        distanceNew += arr[visitedCitiesNew[(visitedCitiesNew.length - 1)]][visitedCitiesNew[0]];
        visitedCitiesNew.push(visitedCitiesNew[0]);
        
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
  
  greedyRandom(visitedCitiesInit, distanceInit);
  
  
  
  
  












