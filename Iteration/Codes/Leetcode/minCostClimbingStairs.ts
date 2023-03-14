/*
 * Description: 747：使用最小花费爬楼梯
 * Url: https://leetcode.cn/problems/min-cost-climbing-stairs/
 * Tags: 数组  动态规划
 * Created: 2023-03-14 22:06:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-14 22:22:05
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function minCostClimbingStairs(cost: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 最低花费
  // q2. 爬一个或两个台阶
  // dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  const dp: number[] = []
  dp[0] = 0
  dp[1] = 0

  for (let i = 2; i <= cost.length; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
  }

  console.log(dp)
  return dp[cost.length]
  //
}
export default minCostClimbingStairs
