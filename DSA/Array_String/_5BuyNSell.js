/**
 * Problem: Best Time to Buy and Sell Stock
 * LC-121:
 */

//Approach-1: Brute force approach using 2 for loop
var maxProfit1 = function (prices) {
  let n = prices.length;
  let maxProfit = 0;

  for (let i = 0; i < n; i++) {
    let profit = 0;
    for (let j = i + 1; j < n; j++) {
      profit = Math.max(profit, prices[j] - prices[i]);
    }
    maxProfit = Math.max(maxProfit, profit);
  }
  return maxProfit;
};

//Approach-2: Using Optimal approach by keeping min element
var maxProfit = function (prices) {
  let n = prices.length;
  let maxProfit = 0;
  let min = prices[0];
  for (let i = 1; i < n; i++) {
    maxProfit = Math.max(maxProfit, prices[i] - min);
    min = Math.min(min, prices[i]);
  }
  return maxProfit;
};

//input
prices = [7, 6, 4, 3, 1];
console.log(maxProfit(prices));
