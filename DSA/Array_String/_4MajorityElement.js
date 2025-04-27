/**
 * Problem:  Majority Element
 * LC-169: https://leetcode.com/problems/majority-element/description/
 */

//Approach-1: count freq of element using Map
var majorityElement1 = function (nums) {
  const n = nums.length;
  const map = new Map();

  for (const val of nums) {
    const cnt = map.get(val) || 0;
    map.set(val, cnt + 1);
  }

  let ans = "";
  map.forEach((value, key) => {
    if (value > n / 2) {
      ans = key;
    }
  });
  console.log(ans);
  return ans;
};
//TC:O(n), SC:O(n)

//Approach-2: using BM voting algoritm
var majorityElement = function (nums) {
  let count = 0;
  let el = "";
  for (let val of nums) {
    if (count == 0) {
      count++;
      el = val;
    } else if (el === val) {
      count++;
    } else {
      count--;
    }
  }

  return el;
};
//TC:O(n), SC:O(1)
nums = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(nums));
