/**
 * Problem: Merge Sorted Array
 * LC-88: https://leetcode.com/problems/merge-sorted-array/description/
 */

/**
 * Approach:-1 Using Extra Array
 */
var merge1 = function (nums1, m, nums2, n) {
  let temp = new Array(n + m);
  let index = 0;
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (nums1[i] <= nums2[j]) {
      temp[index++] = nums1[i++];
    } else {
      temp[index++] = nums2[j++];
    }
  }
  while (i < m) {
    temp[index++] = nums1[i++];
  }

  while (j < n) {
    temp[index++] = nums2[j++];
  }

  // update num1
  temp.forEach((val, i) => (nums1[i] = val));
};

//TC: O(n), SC: O(n)- extra array

/**
 * Approach:-2 In-place
 */
var merge = function (nums1, m, nums2, n) {
  if (m == 0) {
    nums2.forEach((val, i) => (nums1[i] = val));
    return;
  }
  let i = m - 1;
  let j = n - 1;
  let index = m + n - 1;

  while (i >= 0 && j >= 0) {
    if (nums1[i] <= nums2[j]) {
      nums1[index--] = nums2[j--];
    } else {
      nums1[index--] = nums1[i--];
    }
  }

  while (i >= 0) {
    nums1[index--] = nums1[i--];
  }

  while (j >= 0) {
    nums1[index--] = nums2[j--];
  }
};
// TC:O(n),SC:(1)

//INPUT:
let nums1 = [2, 0],
  m = 1,
  nums2 = [1],
  n = 1;
merge(nums1, m, nums2, n);
console.log(nums1);
