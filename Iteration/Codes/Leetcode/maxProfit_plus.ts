/*
 * Description: 122：买卖股票的最佳时机 II
 * Url: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/
 * Tags: 贪心  数组  动态规划
 * Created: 2023-03-11 14:21:58
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 14:53:37
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 贪心版本
 * @param prices
 * @returns
 */
function maxProfit1(prices: number[]): number {
  // Think for yourself for 5 minutes...

  let max: number = 0

  // q1. 只允许一支股票
  // q2. 想要获利至少两天一个利润单元
  // q3. 每天的利润序列 (p[i+1]-p[i-1])...(p[1]-p[0])
  // q4. 只取利润为正数的
  // q5. 第一天没利润

  for (let i = 1; i < prices.length; i++) {
    max += Math.max(prices[i] - prices[i - 1], 0) // 只取正数
    // 也可以换成
    // if (prices[i] - prices[i - 1] > 0) {
    //   max += prices[i] - prices[i - 1]
    // }
  }

  return max
}

const maxProfit = (prices: number[]) => {
  let dp = Array.from(Array(prices.length), () => Array(2).fill(0))
  // dp[i][0] 表示第i天持有股票所得现金。
  // dp[i][1] 表示第i天不持有股票所得最多现金
  dp[0][0] = 0 - prices[0]
  dp[0][1] = 0
  for (let i = 1; i < prices.length; i++) {
    // 如果第i天持有股票即dp[i][0]， 那么可以由两个状态推出来
    // 第i-1天就持有股票，那么就保持现状，所得现金就是昨天持有股票的所得现金 即：dp[i - 1][0]
    // 第i天买入股票，所得现金就是昨天不持有股票的所得现金减去 今天的股票价格 即：dp[i - 1][1] - prices[i]
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i])

    // 在来看看如果第i天不持有股票即dp[i][1]的情况， 依然可以由两个状态推出来
    // 第i-1天就不持有股票，那么就保持现状，所得现金就是昨天不持有股票的所得现金 即：dp[i - 1][1]
    // 第i天卖出股票，所得现金就是按照今天股票佳价格卖出后所得现金即：prices[i] + dp[i - 1][0]
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i])
  }

  return dp[prices.length - 1][1]
}
export default maxProfit
