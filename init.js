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
      distance += sumRangeInArray(arr[visitedCities[(visitedCities.length - 1)]], visitedCities[(visitedCities.length - 1)], newCity);
      visitedCities.push(newCity);
      //console.log("each step distance: " + distance);
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
        distance += sumRangeInArray(arr[visitedCities[(visitedCities.length - 1)]], visitedCities[(visitedCities.length - 1)], newCity);
        visitedCities.push(newCity);
        //console.log("each step distance: " + distance);
      }
    }
    
    //console.log("each route & distance: " + distance + " " + visitedCities);

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
    console.log("arr " + arr[visitedCities[(visitedCities.length - 1)]]);
    let possibleCities = [...arr[visitedCities[(visitedCities.length - 1)]]];
    
    newCity = possibleCities.indexOf(Math.min(...possibleCities));
    
    while (cityFilter.has(newCity) || !Boolean(possibleCities[newCity])) {
      console.log("while " + newCity);
      
      cityFilter.add(newCity);
      possibleCities[newCity] = Infinity;
      newCity = possibleCities.indexOf(Math.min(...possibleCities));
    }

    if (!cityFilter.has(newCity) && Boolean(possibleCities[newCity])) {
      console.log("if " + newCity);
      distance += sumRangeInArray(arr[visitedCities[(visitedCities.length - 1)]], visitedCities[(visitedCities.length - 1)], newCity);
      visitedCities.push(newCity);
    } 
    
    //console.log(cityFilter);
    console.log([...cityFilter]);
    console.log(distance);

    //break;
  }

  console.log(visitedCities);
  console.log(arr);
  console.log(distance);
}

//test












