/*
 * Description: 122：买卖股票的最佳时机 II
 * Url: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/
 * Tags: 贪心  数组  动态规划
 * Created: 2023-03-18 13:58:27
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 14:09:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 动态规划版本
 * @param prices
 */
function maxProfitIibydp(prices: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 能获得的最大利润
  // q2. 可以买卖多次
  // dp[1][0] 表示i天持有股票所得现金
  // dp[i][1] 表示i天不持有股票所得最多现金
  // 对于dp[i][0] 有两种情况 a.i-1天就持有，保持现状dp[i-1][0] b. i天买入股票，dp[i-1][1] - prices[i]
  // 对于dp[i][1] 有两种情况 b. i-1天不持有，保持现状dp[i-1][1] b. i天卖出股票，dp[i-1][0] + prices[i]
  const n: number = prices.length
  if (n === 0) return 0

  const dp: number[][] = Array(n).fill([0, 0])
  dp[0] = [-prices[0], 0]

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i])
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i])
  }

  return dp[n - 1][1]
}
export default maxProfitIibydp
