
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
  
  while(knapsackWeight < maxWeight && objects.weight.some(item => item < (maxWeight - knapsackWeight))) {
    
    
    
    /*
    chance = randomNumber(2);
    

    
    if(objects.weight[randomIndexPick] + arr.reduce((acc, total) => acc + total) > maxWeight) {
      
    }
    
    arr.push(objects.weight[randomIndexPick]);
    arr.push(objects.value[randomIndexPick]);
    i++;
    */
    break;
  }
  
  return arr;
} 

let myObjects = createRandomObjects(10, 99, 10);
let knapsack1 = createRandomKnapsack(35, myObjects);
//let knapsack2 = createRandomKnapsack(35, myObjects);

console.log("index1 " + myObjects.value[1] + " " + myObjects.weight[1]);
console.log(myObjects);

console.log(knapsack1);
//console.log(knapsack2);



/*
Create random knapsack array x2

function check fitness of object array

genetic mix and doulbe number of oject arrays (4)
check fitness and keep best 2 arrays.

create loop
*/







