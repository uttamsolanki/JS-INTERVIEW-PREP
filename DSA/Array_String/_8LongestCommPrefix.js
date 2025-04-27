/**
 * Problem: Longest Common Prefix
 * LC-14: https://leetcode.com/problems/longest-common-prefix/description/
 */

//Approach - 1: interative approach
var longestCommonPrefix = function (strs) {
  const n = strs.length;
  if (strs.length === 0) {
    return "";
  }

  const str = strs[0];
  let preFix = "";
  for (let i = 0; i < str.length && !preFix; i++) {
    let ch = str[i];
    for (let j = 1; j < n && !preFix; j++) {
      if (strs[j][i] != ch || strs[j].length === i) {
        return str.substring(0, i);
      }
    }
  }
  return str;
};

//INPUT

strs = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strs));
