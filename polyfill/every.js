/**
 * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
 * The every() method of Array instances tests whether all elements in the array pass the test implemented by the provided function.
 * It returns a Boolean value.
 * every(callbackFn), every(callbackFn,thisArg)
 *
 * return true unless callbackFn returns a falsy value for an array element, in which case false is immediately returned.
 */

Array.prototype.Every = function (callbackFn, thisArg) {
  //check if array or not
  for (let i = 0; i < this.length; i++) {
    let callBack = callbackFn.call(thisArg, this[i], i, this);
    if (!callBack) {
      return false;
    }
  }
  return true;
};

const arr = [1, 2, 3, 4, 5];

const isSmallerThen5 = (x) => x <= 5;

console.log(arr.every(isSmallerThen5));
console.log(arr.Every(isSmallerThen5));
