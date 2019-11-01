
function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function sumRangeInArray(arr, start, end) {
  if (start > end) {
    [start, end] = [end, start];
  } 
  return arr.slice(start, end+1).reduce((total, value) => Number(total) + Number(value))
}

function createRandomObjects(numberOfObjects, maxValue, maxWeight) {
  let object = {
    value: Array.from({length: numberOfObjects}, () => randomNumber(maxValue)),
    weight: Array.from({length: numberOfObjects}, () => randomNumber(maxWeight))
  }
  
  return object;
}

function createRandomKnapsack(maxWeight, objects) {
  let arr = [];
  let i = 0;
  let knapsackWeight = 0;
  
  while(knapsackWeight < maxWeight && objects.weight.some(item => item <= (maxWeight - knapsackWeight))) {
    
    let validWeightPicks = objects.weight.reduce((acc,cur,idx) => {
      if(cur <= (maxWeight - knapsackWeight) && !arr.includes(idx)) {
        acc.push(idx);
      }
      return acc;
    },[]);
    
    if (!validWeightPicks.length) {
      break;
    }
    
    console.log("valid: " + validWeightPicks);
    
    randomPick = randomNumber((validWeightPicks.length - 2));
    
    console.log("pick: " + randomPick);
    arr.push(validWeightPicks[randomPick]);
    console.log(arr);
    knapsackWeight += objects.weight[validWeightPicks[randomPick]];
    console.log(knapsackWeight);
  }
  
  return arr;
} 

function checkFitness(knapsack, objects) {
  let fitness = 0;
  
  knapsack.forEach(item => fitness += objects.value[item]);
  console.log(fitness);
  
  return fitness;
}

let myObjects = createRandomObjects(10, 99, 10);
let knapsack1 = createRandomKnapsack(35, myObjects);
let knapsack2 = createRandomKnapsack(35, myObjects);

console.log(myObjects);

console.log(knapsack1);
console.log(knapsack2);

let fit = checkFitness(knapsack1, myObjects);
console.log(fit);



/*
function check fitness of object array

genetic mix and doulbe number of oject arrays (4)
check fitness and keep best 2 arrays.

create loop
*/


