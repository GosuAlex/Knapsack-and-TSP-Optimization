//gjern sum array reng in. skriv noe om algoen her. dette er index genetic ish...

function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function createRandomObjects(numberOfObjects, maxValue, maxWeight) {
  let object = {
    value: Array.from({length: numberOfObjects}, () => randomNumber(maxValue)),
    weight: Array.from({length: numberOfObjects}, () => randomNumber(maxWeight))
  }
  
  return object;
}

function createRandomKnapsack(maxWeight, objects) {
  let arr = Array.from({length: objects.weight.length}, (v, i) => 0);;
  let i = 0;
  let knapsackWeight = 0;
  
  //this might be cheating
  /*while(knapsackWeight < maxWeight && objects.weight.some(item => item <= (maxWeight - knapsackWeight))) {
    
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
  */
  //truly random, no cheating
  while (knapsackWeight < maxWeight && i <= maxWeight) {
    randomPick = randomNumber(arr.length - 2);
    arr[randomPick] = 1;
    knapsackWeight += objects.weight[randomPick];
    i++;
  }
  enforceWeightLimit(arr, maxWeight, objects);
  
  return arr;
} 

function checkFitness(knapsack, objects) {
  let fitness = 0;
  
  knapsack.forEach((item, index) => {
    if (item == 1) {
      fitness += objects.value[index];
    }
  });
  
  return fitness;
}

function checkWeight(knapsack, objects) {
  let weight = 0;
  
  knapsack.forEach((item, index) => {
    if (item == 1) {
      weight += objects.weight[index];
    }
  });

  return weight;
}

function enforceWeightLimit(knapsack, maxWeight, objects) {
  let weight = checkWeight(knapsack, objects);
  let containsIndex = [];
  
  knapsack.forEach((item, index) => {
    if (item == 1) {
      containsIndex.push(index);
    }
  });

  while(weight > maxWeight) {
    let randomRemove = randomNumber(containsIndex.length - 2);
    weight -= objects.weight[containsIndex[randomRemove]];
    knapsack[containsIndex[randomRemove]] = 0;
  }
}

function mutateRandom(knapsack, objects) {
  let randomPick = randomNumber(knapsack.length - 2);

  if (knapsack[randomPick] == 1) {
    knapsack[randomPick] = 0; 
  }
  else {
    knapsack[randomPick] = 1;
  }
}

function pairParents([...arr]) {
  let arrPaired = [];

  for(let sack in arr) {
    randomSack = randomNumber(arr.length - 1);
    arrPaired.push([arr[0], arr[randomSack]]);
    arr.splice(randomSack, 1);
    arr.shift();
  }
  
  
  return arrPaired;
}

function geneticRangeCrossover(knapsacks, maxWeight, generations, objects) {
  let reproductionArray = [];
  let survivalArray = [];
  let gens = generations;
  let maxNoChangesBeforeQuit = 20;
  survivalArray[0] = Array.from({length: knapsacks.length}, (v, i) => 0);
  survivalArray[1] = Array.from({length: knapsacks.length}, (v, i) => knapsacks[i]);
  
  //Pair parents sacks
  for(let sack in knapsacks) {
    randomSack = randomNumber(knapsacks.length - 1);
    reproductionArray.push([knapsacks[0], knapsacks[randomSack]]);
    knapsacks.splice(randomSack, 1);
    knapsacks.shift();
  }
  
  while (gens > 0 && maxNoChangesBeforeQuit >= 0) {
    //loop
    
    if (gens !== generations) {
      reproductionArray = pairParents(survivalArray[1]);
      
      //Accept the current best ones everytime.
      //Unlike without, it has memory and only accept better ones.
      //maxNoChangesBeforeQuit won't work with this on.
      //results better with few chromosomes (4), but worse with more (16)
      //because lack of movement/variance with fewer ones. So they need more pressure to change
      survivalArray[0] = Array.from({length: survivalArray[0].length}, (v, i) => 0);
    }
    
    let rangeStartIndex = randomNumber(reproductionArray[0][0].length -2);
    let rangeEndIndex = randomNumber(reproductionArray[0][0].length -2);
    if (rangeStartIndex > rangeEndIndex) {
      [rangeStartIndex, rangeEndIndex] = [rangeEndIndex, rangeStartIndex];
    }
    
    //console.log(rangeStartIndex);
    //console.log(rangeEndIndex);
    
    let change = false;
    
    for(let arr in reproductionArray) {
      
      reproductionArray[arr][2] = Array.from(reproductionArray[arr][0], x => x);   
      reproductionArray[arr][3] = Array.from(reproductionArray[arr][1], x => x); 
      let crossFrom0 = reproductionArray[arr][0].slice(rangeStartIndex, rangeEndIndex + 1);
      let crossFrom1 = reproductionArray[arr][1].slice(rangeStartIndex, rangeEndIndex + 1);
      //reproductionArray[arr][2].splice(rangeStartIndex, crossFrom1.length, ...crossFrom1);
      //reproductionArray[arr][3].splice(rangeStartIndex, crossFrom0.length, ...crossFrom0);
      //this might also be cheating or... dunno. reproduction method is free choice.
      reproductionArray[arr][2].splice(rangeStartIndex, crossFrom1.length, ...crossFrom1);
      reproductionArray[arr][3].splice(rangeStartIndex, crossFrom0.length, ...crossFrom0);
      
      //console.log(checkFitness(reproductionArray[arr][0], objects));
      //console.log(reproductionArray[arr][3]);
      
      //let set2 = new Set(reproductionArray[arr][2]);
      //reproductionArray[arr][2] = [...set2];
      //let set3 = new Set(reproductionArray[arr][3]);
      //reproductionArray[arr][3] = [...set3];

      //console.log(reproductionArray[arr][2]);
      //console.log(reproductionArray[arr][3]);
      
      //chance: random mutation
      reproductionArray[arr].forEach(sack => {
        if (Math.random() > 0.5) {
          for (let i = 1; i > 0; i--) {
            mutateRandom(sack, objects);
          }
        }
      });

      //remove excessive weight
      reproductionArray[arr].forEach(sack => enforceWeightLimit(sack, maxWeight, objects));

      //check wheight limit
      /*
      let weight = [];
      reproductionArray[arr].forEach(sack => weight.push(checkWeight(sack, objects)));
      console.log("wgt "+ weight);
      */
      
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
          change = true;
        }
      });
      
      //kick duplicates | might not need this if there is the no change after x tries kick
      /*
      console.log(survivalArray[0]);
      survivalArray[0].forEach((item, index) => {
        if(survivalArray[0].indexOf(item) !== index) {
          //survivalArray[0][index] = 0;
          console.log(survivalArray[1][index]);
          console.log(survivalArray[0][index]);
          for (let i = 10; i > 0; i--) {
            mutateRandom(survivalArray[1][index], objects);
            console.log(survivalArray[1][index]);
          }
          enforceWeightLimit(survivalArray[1][index], maxWeight, objects);
          survivalArray[0][index] = checkFitness(survivalArray[1][index], objects);
          console.log(survivalArray[1][index]);
          console.log(survivalArray[0][index]);
        }
      });
      */

    }
    
  //console.log(maxNoChangesBeforeQuit + " _ " + (generations - gens));
  if (!change) {
    maxNoChangesBeforeQuit--;
  } else {
    maxNoChangesBeforeQuit = 20; //magic number !
  }  

  //console.log(reproductionArray[arr]);
  console.log(survivalArray[0]);
    
  gens--;
  }

  return survivalArray; 
}

//let myObjects = createRandomObjects(100, 99, 10);
//Testing objects
let myObjects = {
  value: [50, 67, 48, 53, 21, 53, 4, 1, 90, 88, 30, 49, 1, 77, 49, 60, 33, 61, 20, 2, 8, 2, 91, 29, 36, 47, 27, 41, 24, 32, 9, 56, 27, 32, 31, 1, 79, 31, 85, 25, 47, 5, 64, 90, 10, 79, 93, 87, 9, 61, 76, 83, 31, 44, 43, 25, 51, 20, 12, 86, 34, 87, 48, 70, 53, 52, 26, 51, 23, 99, 28, 48, 66, 37, 50, 68, 32, 97, 90, 4, 98, 93, 85, 21, 58, 19, 99, 36, 58, 94, 73, 36, 86, 97, 15, 41, 18, 37, 27, 24],
  weight: [9, 10, 2, 4, 6, 10, 8, 7, 1, 4, 4, 10, 8, 2, 10, 5, 6, 10, 5, 3, 10, 7, 6, 10, 3, 6, 7, 5, 4, 7, 9, 5, 4, 1, 10, 8, 8, 7, 7, 2, 5, 1, 7, 6, 9, 8, 1, 9, 10, 6, 3, 3, 10, 2, 7, 5, 1, 2, 6, 4, 1, 3, 9, 8, 8, 5, 4, 8, 7, 5, 2, 9, 5, 5, 6, 1, 7, 7, 4, 1, 7, 4, 7, 5, 10, 3, 10, 8, 7, 4, 2, 7, 6, 1, 1, 10, 1, 4, 8, 8]
}

//1010 is best fitness according to http://rosettacode.org/wiki/Knapsack_problem/Bounded
//let myObjects = {
//  value: [150, 35, 200, 60, 60, 45, 60, 40, 30, 10, 70, 30, 15, 10, 40, 70, 75, 80, 20, 12, 50, 10,10,12,10,15,10,10,40,40,60,60,45,45,60,60,200],
//  weight: [9,13,153,50,15,68,27,39,23,52,11,32,24,48,73,42,43,22,7,18,4,30,30,18,48,24,52,52,39,39,27,27,68,68,15,50,153]
//}

let knapsacks = [];
for (let i = 4; i > 0; i--) {
  knapsacks.push(createRandomKnapsack(35, myObjects));
}

console.log(myObjects);

let before = knapsacks;
console.log(before);

let after = geneticRangeCrossover(knapsacks, 35, 100, myObjects);
console.log(after);

console.log(checkWeight(after[1][0], myObjects));
console.log(checkWeight(after[1][1], myObjects));
console.log(checkWeight(after[1][2], myObjects));
console.log(checkWeight(after[1][3], myObjects));



/*
function genetic (point crossover)
check randomNumber -2 stuff is working
random range pick isn't good. it picks from [0][0]. It should pick from the longeste maybe? dunno
make knapsacks objects. with fitness, object array, knapsack contains array, weight on them.
return only the very best knapsack.
use reduce on check weight and fitness
remove sumRangeInArray
put testing into it. JS testing.

put best knapsacks in array, so there is memory and return those instead of the current iteration
fix pariring so there is a function call instead of doing it two ways. knapsack, past reproduction
make maxNoChangesBeforeQuit work with accept current iteration and not only best ones.

*/
