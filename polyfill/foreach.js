/**
 * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 * The forEach() method of Array instances executes a provided function once for each array element.
 * forEach(callbackFn)
 * forEach(callbackFn, thisArg) => callbackFn(element, index, array)
 *
 * There is no way to stop or break a forEach() loop other than by throwing an exception.
 * forEach() expects a synchronous function — it does not wait for promises.
 * forEach() always returns undefined and it not chainable means we can not call other functions on forEach result
 */

Array.prototype.foreach = function (callbackFn, thisArg = this) {
  for (let i = 0; i < this.length; i++) {
    if (!this[i]) continue;
    callbackFn.call(thisArg, this[i], i, this);
  }
};

let arr = [1, 2, 3, 4, , 5];

arr.forEach(console.log);
arr.foreach(console.log);
