
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
    
    randomPick = randomNumber(validWeightPicks.length - 2);
    
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
  
  return fitness;
}

function geneticRangeCrossover(knapsacks, objects) {
  let reproductionArray = [];
  //let knapsacksBest = LENGTH ORIGINAL;
  
  for(let sack in knapsacks) {
    randomSack = randomNumber(knapsacks.length - 1);
    reproductionArray.push([knapsacks[0], knapsacks[randomSack]]);
    knapsacks.splice(randomSack, 1);
    knapsacks.shift();
  }
  
  //loop
  
  let rangeStartIndex = randomNumber(reproductionArray[0][0].length -1);
  let rangeEndIndex = randomNumber(reproductionArray[0][0].length -1);
  if (rangeStartIndex > rangeEndIndex) {
    [rangeStartIndex, rangeEndIndex] = [rangeEndIndex, rangeStartIndex];
  }
  
  console.log(rangeStartIndex);
  console.log(rangeEndIndex);
  
  for(let arr in reproductionArray) {
    console.log(reproductionArray[arr]);
    
    reproductionArray[arr][2] = Array.from(reproductionArray[arr][0], x => x);   
    reproductionArray[arr][3] = Array.from(reproductionArray[arr][1], x => x); 
    let crossFrom0 = reproductionArray[arr][0].slice(rangeStartIndex, rangeEndIndex + 1);
    let crossFrom1 = reproductionArray[arr][1].slice(rangeStartIndex, rangeEndIndex + 1);
    reproductionArray[arr][2].splice(rangeStartIndex, crossFrom1.length, ...crossFrom1);
    reproductionArray[arr][3].splice(rangeStartIndex, crossFrom1.length, ...crossFrom0);
    
    
    //duplicates!!!
    
    console.log(reproductionArray[arr]);
  }
  
  console.log(reproductionArray);
  
  //pick random range
  //reproduction loop tru 2d array, slice & splice, push children in same array as parents
  
  //chance: random mutation
  
  //put best knapsacks into same length array as original
  //fill array with all 0's so that any fitness is better
  //check fitness and if better, find index math.min value and put better fitness there
  
  //stop loop
  
  return knapsacks; 
}

let myObjects = createRandomObjects(10, 99, 10);
let knapsack1 = createRandomKnapsack(35, myObjects);
let knapsack2 = createRandomKnapsack(35, myObjects);
let knapsack3 = createRandomKnapsack(35, myObjects);
let knapsack4 = createRandomKnapsack(35, myObjects);

console.log(myObjects);

let before = [knapsack1, knapsack2, knapsack3, knapsack4];
console.log(before);

let after = geneticRangeCrossover([knapsack1, knapsack2, knapsack3, knapsack4], myObjects);
console.log(after)

/*
function genetic (point crossover)

*/


