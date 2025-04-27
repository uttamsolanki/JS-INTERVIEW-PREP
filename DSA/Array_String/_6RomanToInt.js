/**
 * Problem: Roman to Integer
 * LC-13: https://leetcode.com/problems/roman-to-integer/description/
 */
var romanToInt = function (s) {
  const map = new Map();
  map.set("I", 1);
  map.set("V", 5);
  map.set("X", 10);
  map.set("L", 50);
  map.set("C", 100);
  map.set("D", 500);
  map.set("M", 1000);

  let ans = 0;
  let n = s.length;
  for (let i = 0; i < s.length; i++) {
    if (i + 1 < n && map.get(s[i]) < map.get(s[i + 1])) {
      ans -= map.get(s[i]);
    } else {
      ans += map.get(s[i]);
    }
  }
  return ans;
};
//TC:O(n), SC:O(1)

//INPUT
console.log(romanToInt("MCMXCIV"));
