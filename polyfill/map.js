/**
 * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 * The map() method of Array instances creates a new array populated with the results of calling a provided function on every element in the calling array.
 * map(callbackFn)
 * map(callbackFn, thisArg)
 * callbackFn(element,index, array)
 *  - element = current array item
 *  - index = current array index
 *  - array = the array which is map called upon
 */

Array.prototype.mymap = function (callbackFn, thisArgs = this) {
  let mapArray = [];
  mapArray.length = this.length;
  for (let i = 0; i < this.length; i++) {
    if (!this[i]) {
      continue;
    }
    mapArray[i] = callbackFn.call(thisArgs, this[i], i, this);
  }
  return mapArray;
};

let arr = [1, 2, 3, 4, , 5, {}];

const callbackFn = (item) => item * 2;

console.log(arr.map(callbackFn));

console.log(arr.mymap(callbackFn));

const arrayLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4,
  3: 5, // ignored by map() since length is 3
};

console.log(Array.prototype.map.call(arrayLike, callbackFn));
console.log(Array.prototype.mymap.call(arrayLike, callbackFn));

const multiplier = {
  factor: 10,
  multiply(num) {
    return num * this.factor;
  },
};

console.log(arr.map(multiplier.multiply, multiplier));

console.log(arr.mymap(multiplier.multiply, multiplier));
