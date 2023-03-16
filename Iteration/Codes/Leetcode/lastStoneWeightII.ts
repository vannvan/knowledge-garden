/*
 * Description: 1130：最后一块石头的重量 II
 * Url: https://leetcode.cn/problems/last-stone-weight-ii/
 * Tags: 数组  动态规划
 * Created: 2023-03-16 14:46:23
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 15:10:12
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function lastStoneWeightII(stones: number[]): number {
  // Think for yourself for 5 minutes...
  // q1.重量stones[i] 价值stones[i]
  // dp[j] 就是重量为j时的最多可以装的重量

  const n: number = stones.length

  // 套用背包
  const weights: number[] = stones
  const values: number[] = stones

  const sum: number = stones.reduce((prev, curr) => prev + curr)

  const target: number = Math.floor(sum / 2)
  const dp: number[] = Array(target + 1).fill(0)

  for (let i = 0; i < n; i++) {
    for (let j = target; j >= stones[i]; j--) {
      const w = j - stones[i]
      dp[j] = Math.max(dp[j], dp[w] + stones[i])
    }
  }

  // console.log(dp)
  // sum - dp[target] 是一堆 dp[target]是另一堆
  // 剩下的最小石头重量就是 (sum - dp[target]) - dp[target]
  return sum - dp[target] - dp[target]
}
export default lastStoneWeightII
