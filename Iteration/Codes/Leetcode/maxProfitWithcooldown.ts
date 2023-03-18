/*
 * Description: 309：最佳买卖股票时机含冷冻期
 * Url: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/
 * Tags: 数组  动态规划
 * Created: 2023-03-18 15:09:11
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 15:31:49
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maxProfitWithcooldown(prices: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 考虑卖出之后第二天为冷冻期
  // q2. 确定股票状态  买入 保持 卖出 冷冻中
  // 交易状态为 [买入, 卖出, 冷冻期, 买入, 卖出, 冷冻]
  // dp[i][0] 表示买入 可选 a. 持有  dp[i-1][0] b1. 今天买入但前一天是冷冻期 dp[i - 1][3] - prices[i]  b2. 前一天是保持卖出状态dp[i-1][1] - prices[i]
  // dp[i][1] 达到保持卖出 a. 保持状态2 dp[i-1][1]  b. 前一天是冷冻期 dp[i-1][3]
  // dp[i][2] 确定卖出 dp[i-1][0] + prices[i]
  // dp[i][3] 冷冻 dp[i-1][2]
  // 对于结果需要求 后三种状态的最大值

  const n: number = prices.length
  if (n === 0) return 0

  const dp: number[][] = Array.from(Array(prices.length), () => Array(4).fill(0))

  dp[0][0] -= prices[0]

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][3] - prices[i], dp[i - 1][1] - prices[i])
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][3])
    dp[i][2] = Math.max(dp[i - 1][0] + prices[i])
    dp[i][3] = Math.max(dp[i - 1][2])
  }

  return Math.max(dp[n - 1][1], dp[n - 1][2], dp[n - 1][3])
}
export default maxProfitWithcooldown
