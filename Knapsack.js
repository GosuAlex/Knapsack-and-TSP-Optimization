
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
    
    //this might be cheating
    let validWeightPicks = objects.weight.reduce((acc,cur,idx) => {
      if(cur <= (maxWeight - knapsackWeight) && !arr.includes(idx)) {
        acc.push(idx);
      }
      return acc;
    },[]);
    
    if (!validWeightPicks.length) {
      break;
    }
    
    //console.log("valid: " + validWeightPicks);
    
    randomPick = randomNumber(validWeightPicks.length - 2);
    
    //console.log("pick: " + randomPick);
    arr.push(validWeightPicks[randomPick]);
    //console.log(arr);
    knapsackWeight += objects.weight[validWeightPicks[randomPick]];
    //console.log(knapsackWeight);
  }
  /* truly random, no cheating
  let i = 0;
  
  while (knapsackWeight < maxWeight && i => maxWeight) {
    randomPick = randomNumber(objects.weight.length - 2);
    
    if (!arr.includes(randomPick) && objects.weight[randomPick] + knapsackWeight =< maxWeight) {
      arr.push(objects.weight[randomPick]);
      knapsackWeight += objects.weight[randomPick];
    }
    
    i++;
  }
  */
  
  return arr;
} 

function checkFitness(knapsack, objects) {
  let fitness = 0;
  
  knapsack.forEach(item => fitness += objects.value[item]);
  
  return fitness;
}

function checkWeight(knapsack, objects) {
  let weight = 0;
  
  knapsack.forEach(item => weight += objects.weight[item]);

  return weight;
}

function enforceWeightLimit(knapsack, maxWeight, objects) {
  let weight = checkWeight(knapsack, objects);
  
  //knapsack.forEach(item => weight += objects.weight[item]);
  
  while(weight > maxWeight) {
    let randomRemove = randomNumber(knapsack.length - 2);
    weight -= objects.weight[knapsack[randomRemove]];
    knapsack.splice(randomRemove, 1);
  }
}

function mutateRandom(knapsack, objects) {
  knapsack[randomNumber(knapsack.length - 2)] = objects.weight[randomNumber(objects.weight.length - 2)];
}

function geneticRangeCrossover(knapsacks, maxWeight, objects) {
  let reproductionArray = [];
  let survivalArray = [];
  survivalArray[0] = Array.from({length: knapsacks.length}, (v, i) => 0);
  survivalArray[1] = Array.from({length: knapsacks.length}, (v, i) => knapsacks[i]);
  
  //Pair parents sacks
  for(let sack in knapsacks) {
    randomSack = randomNumber(knapsacks.length - 1);
    reproductionArray.push([knapsacks[0], knapsacks[randomSack]]);
    knapsacks.splice(randomSack, 1);
    knapsacks.shift();
  }
  
  let loop = 100;
  while (loop > 0) {
  //loop
  
  let rangeStartIndex = randomNumber(reproductionArray[0][0].length -1);
  let rangeEndIndex = randomNumber(reproductionArray[0][0].length -1);
  if (rangeStartIndex > rangeEndIndex) {
    [rangeStartIndex, rangeEndIndex] = [rangeEndIndex, rangeStartIndex];
  }
  
  //console.log(rangeStartIndex);
  //console.log(rangeEndIndex);
  
  for(let arr in reproductionArray) {
    //console.log(reproductionArray[arr]);
    
    reproductionArray[arr][2] = Array.from(reproductionArray[arr][0], x => x);   
    reproductionArray[arr][3] = Array.from(reproductionArray[arr][1], x => x); 
    let crossFrom0 = reproductionArray[arr][0].slice(rangeStartIndex, rangeEndIndex + 1);
    let crossFrom1 = reproductionArray[arr][1].slice(rangeStartIndex, rangeEndIndex + 1);
    reproductionArray[arr][2].splice(rangeStartIndex, crossFrom1.length, ...crossFrom1);
    reproductionArray[arr][3].splice(rangeStartIndex, crossFrom1.length, ...crossFrom0);
    
    //console.log(reproductionArray[arr][2]);
    //console.log(reproductionArray[arr][3]);
    
    let set2 = new Set(reproductionArray[arr][2]);
    reproductionArray[arr][2] = [...set2];
    let set3 = new Set(reproductionArray[arr][3]);
    reproductionArray[arr][3] = [...set3];

    //console.log(reproductionArray[arr][2]);
    //console.log(reproductionArray[arr][3]);
    
    //chance: random mutation
    reproductionArray[arr].forEach(sack => {
      if (Math.random() > 0.5) {
        mutateRandom(sack, objects);
      }
    });
    
    //check wheight limit
    /*
    let weight = [];
    reproductionArray[arr].forEach(sack => weight.push(checkWeight(sack, objects)));
    */
    
    //remove excessive weight
    reproductionArray[arr].forEach(sack => enforceWeightLimit(sack, maxWeight, objects));
    
    //reproductionArray[arr].forEach(sack => weight.push(checkWeight(sack, objects)));
    //console.log("wgt "+ weight);
    
    //check fitness
    /*
    let fitness = [];
    reproductionArray[arr].forEach(sack => fitness.push(checkFitness(sack, objects)));
    console.log("fit " + fitness);    
    */
    
    //put best knapsacks into same length array as original
    reproductionArray[arr].forEach(sack => {
      let sackFitness = checkFitness(sack, objects);
      let leastFitIndex = survivalArray[0].findIndex(item => item == Math.min(...survivalArray[0]));
      if (survivalArray[0][leastFitIndex] < sackFitness) {
        survivalArray[0][leastFitIndex] = sackFitness;
        survivalArray[1][leastFitIndex] = [...sack];
      }
    });
    
    //console.log(reproductionArray[arr]);
    console.log(survivalArray[0]);
  }
  
  loop--;
  }
  
  //stop loop
  
  return survivalArray; 
}

let myObjects = createRandomObjects(100, 99, 10);
//let knapsack1 = createRandomKnapsack(35, myObjects);
let knapsacks = [];
for (let i = 50; i > 0; i--) {
  knapsacks.push(createRandomKnapsack(35, myObjects));
}

console.log(myObjects);

let before = knapsacks;
console.log(before);

let after = geneticRangeCrossover(knapsacks, 35, myObjects);
console.log(after);

//let again = geneticRangeCrossover(after[1], 35, myObjects);
//console.log(again);


/*
function genetic (point crossover)
check randomNumber -2 stuff is working
send number of loop to function, send fitness with the knapsack so it would never get worse.
if fitness if equal on more sacks, randomize it quite a bit for kick esque effect.
random range pick isn't good. it picks from [0][0]. It should pick from the longeste maybe? dunno
probably the random objects has a lot to do with start fitness and end results not changing much
*/


