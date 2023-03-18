/*
 * Description: 188：买卖股票的最佳时机 IV
 * Url: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/
 * Tags: 数组  动态规划
 * Created: 2023-03-18 14:32:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 14:46:26
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maxProfitIv(k: number, prices: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 考虑可以完成k笔交易
  // q2. dp[i][j] 表示第i天剩下的最大现金
  // q3. 沿用最佳时机III的思路 dp[i][0] 不操作 dp[i][1] 买入的状态 dp[i][2] 卖出的状态 ...
  // q4. 因此采用偶数位表示卖出，奇数位表示买入
  // 因此有 dp[i][j+1] = max(dp[i-1][j+1],dp[i-1][j]-prices[i])
  // dp[i][j+2] = max(dp[i-1][j+2],dp[i-1][j+1]+prices[i])
  const n: number = prices.length
  if (n === 0) return 0

  const dp: number[][] = Array.from(Array(prices.length), () => Array(2 * k + 1).fill(0))

  // 沿用最佳时机III得到的规律，奇数位(不是索引位)都初始化为-prices[0]
  for (let j = 1; j < 2 * k; j += 2) {
    dp[0][j] = -prices[0]
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < 2 * k - 1; j += 2) {
      dp[i][j + 1] = Math.max(dp[i - 1][j + 1], dp[i - 1][j] - prices[i])
      dp[i][j + 2] = Math.max(dp[i - 1][j + 2], dp[i - 1][j + 1] + prices[i])
    }
  }

  return dp[n - 1][2 * k]
}
export default maxProfitIv
