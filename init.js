/*
Compulsory Assignment 1

In this assignment , we are going to solve the travelling salesman problem.
The number of cities is a graph  having 500. Each city is connected to all remaining cities. This means that a graph with 20 cities will have 19 edges.

1:  Calculate an initial solution using random method, iterative random method, and greedy method.
2:  Improve  each  starting solution using greedy improvement and greedy random algorithm.
3:  Run you algorithm  with 50 , 100, 250, 500 cities. What are your conclusions.
*/

function random100() {
  return Math.floor(Math.random() * 100) + 1;
}

function sumRangeInArray(arr, start, end) {
  if (start > end) {
    [start, end] = [end, start];
  } 
  return arr.slice(start+1, end+1).reduce((total, value) => Number(total) + Number(value))
}

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
  //const arr = Array(5).fill(0).map(item => Array(1).fill(random100()));
  const arr = Array.from({length: 50}, () => Math.floor(random100()));
  let visitedCities = [(Math.floor(Math.random() * arr.length))];

  let newCity = null;
  let distance = 0;

  while (visitedCities.length <= arr.length - 1) {
    newCity = Math.floor(Math.random() * arr.length);
    if (!visitedCities.includes(newCity)) {
      distance += sumRangeInArray(arr, visitedCities[(visitedCities.length - 1)], newCity);
      visitedCities.push(newCity);
    }
  }

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
  let times = 5000;
  const arr = Array.from({length: 50}, () => Math.floor(random100()));
  //const arr = Array(5).fill(0).map(item => Array(1).fill(random100()));
  let bestDistance = Infinity;
  let bestRoute = null;
  
  while (times > 0) {
    let visitedCities = [(Math.floor(Math.random() * arr.length))];

    let newCity = null;
    let distance = 0;

    while (visitedCities.length <= arr.length - 1) {
      newCity = Math.floor(Math.random() * arr.length);
      if (!visitedCities.includes(newCity)) {
        distance += sumRangeInArray(arr, visitedCities[(visitedCities.length - 1)], newCity);
        visitedCities.push(newCity);
      }
    }

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

















