/**
 * Problem: Remove Element
 * LC-27: https://leetcode.com/problems/remove-element/description/
 */

//Approach:-1 skip value that match
var removeElement = function (nums, val) {
  let n = nums.length;
  let i = n - 1;
  let j = n - 1;
  let k = 0;

  while (i >= 0 && j >= 0) {
    if (nums[i] === val) {
      //swap
      let temp = nums[i];
      nums[i] = nums[j];
      nums[j] = temp;
      j--;
      k++;
    }
    i--;
  }
  return n - k;
};

//INPUT
(nums = [1]), (val = 1);
console.log(removeElement(nums, val));
console.log(nums);
