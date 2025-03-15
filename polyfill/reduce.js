/**
 * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 * The reduce() method of Array instances executes a user-supplied "reducer" callback function on each element of the array,
 * in order, passing in the return value from the calculation on the preceding element.
 * The final result of running the reducer across all elements of the array is a single value.
 * reduce(callbackFn)
 * reduce(callbackFn, initialValue) -> If initial value is not given then first value consider as inital value and start iteration from next element
 * - callbackFn(accumulator,currentValue,currentIndex,array)
 *   - accumulator => Result from previous element
 *   - currentValue => current element value
 *   - currentIndex => current element index
 *   - array => array which is reduce was called
 */

Array.prototype.myreduce = function (callbackFn, initialValue) {
  if (!initialValue && this.length == 0) {
    throw new Error("Reduce of empty array with no initial value");
  }
  let accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    if (!this[i]) {
      continue;
    }
    if (!accumulator) {
      accumulator = this[i];
    } else {
      accumulator = callbackFn.call(undefined, accumulator, this[i], i, this);
    }
  }
  return accumulator;
};

let arr = [1, 2, 3, 4, 5, 6];

const sum = (accValue, currValue) => accValue + currValue;
console.log(arr.reduce(sum));
console.log(arr.myreduce(sum));

//Usage

// Creating PIPE function
const pipe = (...funs) => {
  return (initialValue) => {
    return funs.reduce((accValue, fun) => fun(accValue), initialValue);
  };
};

const addOne = (x) => x + 1;
const multiTwo = (x) => x * 2;

const addmulti = pipe(addOne, multiTwo);
console.log(addmulti(2));

// Async PIPE
const p1 = async (x) => x + 1;
const p2 = async (x) => x * 2;

const asyncPIPE = (...funs) => {
  return (init) => {
    return funs.reduce(
      (accValue, fun) => accValue.then(fun),
      Promise.resolve(init)
    );
  };
};

asyncPIPE(p1, p2)(10).then(console.log);

// TODO: did not understand when to use Reduce and when not
