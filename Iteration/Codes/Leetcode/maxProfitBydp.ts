/*
 * Description: 121：买卖股票的最佳时机
 * Url: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/
 * Tags: 数组  动态规划
 * Created: 2023-03-17 22:52:54
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-17 23:17:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maxProfitBydp(prices: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 考虑有需要有两个动作  买入和卖出，因此对于i位置的需要维护两个“记录”
  // dp[i][0] 表示第i天 持有的股票现金(手上剩下的钱)
  // dp[i][1] 表示第i天 不持有股票现金所得最多的现金
  // 那么对于dp[i][0] 两种情况可以选择 他前i-1天就持有的dp[i-1][0]  和 他第i天买入当天的股票剩余的现金，-prices[i]
  // 因此dp[i][0] = max(dp[i-1][0],-prices[i])
  // 对于dp[i][1] 也有两种情况 保持现状,即前一天不持有股票所得的现金 dp[i-1][1] 和 卖出股票(当前卖出赚到的和前一天剩下的) +prices[i] + dp[i-1][0]
  // 因此dp[i][1] = max(dp[i-1][1],prices[i]+dp[i-1][0])

  const n: number = prices.length
  if (n === 0) return 0

  const dp = Array(prices.length).fill([0, 0])
  dp[0] = [-prices[0], 0]

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], -prices[i])
    dp[i][1] = Math.max(dp[i - 1][1], prices[i] + dp[i - 1][0])
  }

  return dp[n - 1][1]
}
export default maxProfitBydp
