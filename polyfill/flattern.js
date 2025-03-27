/**
 * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
 * Array.prototype.flat()
 * The flat() method of Array instances creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
 * flat()
 * flat(depth) -> How depth level array should be flattern. Default value is 1
 *  - The flat() method removes empty slots in arrays
 *  - The flat() method reads the length property of this and then accesses each property whose key is a nonnegative integer less than length.
 */

const arr1 = [1, , 2, 3];

Array.prototype.flattern = function (depth = 1) {
  const flattern = [];

  if (depth <= 0) {
    depth = 0;
  }

  const flattenFunc = (arr, depth) => {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && depth >= 1) {
        flattenFunc(arr[i], depth - 1);
      } else {
        flattern.push(arr[i]);
      }
    }
  };
  flattenFunc(this, depth);
  return flattern;
};

console.log(arr1.flat(-1));
console.log(arr1.flattern(-1));
