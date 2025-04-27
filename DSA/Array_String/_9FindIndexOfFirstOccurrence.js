/**
 * Problem: Find the Index of the First Occurrence in a String
 * LC-28: https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/description
 */
var strStr = function (haystack, needle) {
  if (haystack.length === 0) {
    return 0;
  }

  const n = haystack.length;
  const m = needle.length;

  for (let index = 0; index < n; index++) {
    let i = index;
    let j = 0;
    while (j < m && haystack[i] === needle[j]) {
      i++;
      j++;
    }
    if (j == m) {
      return index;
    }
  }
  return -1;
};

//INPUT
(haystack = "sadbutsad"), (needle = "sad");
console.log(strStr(haystack, needle));
