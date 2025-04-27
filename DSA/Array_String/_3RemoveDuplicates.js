/**
 * Problem: Remove Duplicates from Sorted Array
 * LC-26: https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/
 */

//Approach-1: we can use set to remove duplicate
var removeDuplicates1 = function (nums) {
  const unique = Array.from(new Set(nums));
  unique.forEach((val, i) => {
    nums[i] = val;
  });
  return unique.length;
};

//TC: O(n). SC:O(n)

//Approach-2: Using pointers to skip duplicate values
var removeDuplicates = function (nums) {
  let k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] != nums[i]) {
      nums[k++] = nums[i];
    }
  }
  return k;
};

//TC: O(n). SC:O(1)

nums = [1, 1, 2];
removeDuplicates(nums);
console.log(nums);
