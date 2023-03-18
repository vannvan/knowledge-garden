/*
 * Description: 123：买卖股票的最佳时机 III
 * Url: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii
 * Tags: 数组  动态规划
 * Created: 2023-03-18 14:14:26
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 14:40:37
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maxProfit(prices: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 考虑最多可以完成两笔交易
  // q2. 一天一共有五种状态
  // 0.没有操作 （其实我们也可以不设置这个状态）
  // 1.第一次持有股票
  // 2.第一次不持有股票
  // 3.第二次持有股票
  // 4.第二次不持有股票
  // 对于dp[i][1] 有两种情况 a. 买入 dp[i][1] = dp[i-1][0] - prices[i]  b. 无操作，就是前一天的状态 dp[i-1][1] = dp[i-1][1]
  // 对于dp[i][2] 有两种情况 a. 卖出 dp[i][2] = dp[i-1][1] + prices[1] b. 无操作，沿用前一天 dp[i][2] = dp[i-1][2]
  // dp[i][3] = max(dp[i - 1][3], dp[i - 1][2] - prices[i]);
  // dp[i][4] = max(dp[i - 1][4], dp[i - 1][3] + prices[i]);

  const n: number = prices.length
  if (n === 0) return 0
  const dp: number[][] = Array(n).fill([0, 0])
  dp[0] = [0, -prices[0], 0, -prices[0], 0]

  for (let i = 1; i < n; i++) {
    dp[i][0] = dp[i - 1][0]
    dp[i][1] = Math.max(dp[i - 1][0] - prices[i], dp[i - 1][1])
    dp[i][2] = Math.max(dp[i - 1][1] + prices[i], dp[i - 1][2])
    dp[i][3] = Math.max(dp[i - 1][2] - prices[i], dp[i - 1][3])
    dp[i][4] = Math.max(dp[i - 1][3] + prices[i], dp[i - 1][4])
  }
  return dp[n - 1][4]
}
export default maxProfit
