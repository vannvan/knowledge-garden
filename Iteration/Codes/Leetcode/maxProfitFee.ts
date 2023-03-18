/*
 * Description: 714：买卖股票的最佳时机含手续费
 * Url: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
 * Tags: 贪心  数组  动态规划
 * Created: 2023-03-18 14:56:24
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 15:03:40
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maxProfitFee(prices: number[], fee: number): number {
  // Think for yourself for 5 minutes...
  // dp[i][0] 表示第i天持有股票的现金 a. 保持现状 dp[i-1][0] b. 买入 dp[i-1][1] - prices[i]
  // dp[i][1] 表示第i天卖出股票的现金 a. 保持现状 dp[i-1][1] b. 卖出 dp[i-1][0] + prices[i] - fee
  // 最后结果比较第i天选择持有还是卖出 所剩余的现金

  const n: number = prices.length
  if (n === 0) return 0

  const dp: number[][] = Array(n).fill([0, 0])

  dp[0][0] -= prices[0]

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i])
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i] - fee)
  }

  return Math.max(dp[n - 1][0], dp[n - 1][1])
}

export default maxProfitFee
