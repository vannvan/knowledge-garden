/*
 * Description: 122：买卖股票的最佳时机 II
 * Url: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/
 * Tags: 贪心  数组  动态规划
 * Created: 2023-03-11 14:21:58
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 14:37:09
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maxProfit(prices: number[]): number {
  // Think for yourself for 5 minutes...

  let max: number = 0

  // q1. 只允许一支股票
  // q2. 想要获利至少两天一个利润单元
  // q3. 每天的利润序列 (p[i+1]-p[i-1])...(p[1]-p[0])
  // q4. 只取利润为正数的
  // q5. 第一天没利润

  for (let i = 1; i < prices.length; i++) {
    max += Math.max(prices[i] - prices[i - 1], 0) // 只取正数
  }

  return max
}
export default maxProfit
