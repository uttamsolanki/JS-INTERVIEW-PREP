/**
 * Problem: Length of Last Word
 * LC-58: https://leetcode.com/problems/length-of-last-word/description/
 */

//Aproach - 1: Using in-built split functions
var lengthOfLastWord1 = function (s) {
  if (s.length === 0) {
    return 0;
  }
  const strArr = s.trim().split(" ");
  return strArr[strArr.length - 1].length;
};
// TC: O(n), SC:O(number of word) => worst case O(n)

//Aproach - 2: Interative Approach without extra array
var lengthOfLastWord = function (s) {
  let n = s.length;

  let len = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] !== " ") {
      len++;
    } else if (len) {
      break;
    }
  }
  return len;
};
// TC:O(n), SC:O(1)

//INPUT
s = "Hello World ";
console.log(lengthOfLastWord(s));
