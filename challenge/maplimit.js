// Inputs
// inputs: An array of inputs.
// limit: The maximum number of operations at any one time.
// iterateeFn: The async function that should be called with each input to generate the corresponding output. It will have two arguments:
//      input: The input being processed.
//      callback: A function that will be called when the input is finished processing. It will be provided one argument, the processed output.
// callback: A function that should be called with the array of outputs once all the inputs have been processed.

function getNameById(id, callback) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    callback("User" + id);
  }, randomRequestTime);
}

// This solution chunk based so at time we can process (limit) items
// So, we have to wait until finish all (limit) items
function mapLimit(inputs, limit, iterateeFn, callback) {
  let currentCount = 0;
  let inputIndex = 0;
  const result = [];
  const asyncCallback = (res) => {
    currentCount++;
    if (inputs.length === result.length) {
      callback(result);
    }
    result.push(res);
    if (currentCount === limit) {
      currentCount = 0;
      for (let i = 0; i < limit && i < inputs.length; i++) {
        iterateeFn(inputs[inputIndex++], asyncCallback);
      }
    }
  };

  for (let i = 0; i < limit; i++) {
    iterateeFn(inputs[inputIndex++], asyncCallback);
  }
}

// Without chunk we can check next item as soon as current finish
// so basically at a time (limit) items will concurrently processing
// REFERENCE: https://github.com/Soni-Fronteend-Organisation/Soni-Frontend-Interview-Doc/blob/main/JS_Coding_Questions/mapLimit.js
function mapLimit1(inputs, limit, iterateeFn, callback) {
  let currentCount = 0;
  let inputIndex = 0;
  const result = [];
  const n = inputs.length;
  if (n === 0) {
    callback(result);
  }
  const asyncCallback = (res) => {
    currentCount--;
    if (inputs.length === result.length) {
      callback(result);
    }
    result.push(res);

    while (inputIndex < n && currentCount < limit) {
      iterateeFn(inputs[inputIndex++], asyncCallback);
      currentCount++;
    }
  };

  while (inputIndex < n && currentCount < limit) {
    iterateeFn(inputs[inputIndex++], asyncCallback);
    currentCount++;
  }
}

mapLimit([1, 2, 3, 4, 5], 2, getNameById, (allResults) => {
  console.log("output:", allResults); // ["User1", "User2", "User3", "User4", "User5"]
});
