/*
 * Description: 198：打家劫舍
 * Url: https://leetcode.cn/problems/house-robber/
 * Tags: 数组  动态规划
 * Created: 2023-03-17 22:21:57
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-26 22:12:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function rob(nums: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 不能偷相邻的
  // dp[i] 表示包括第i间房子 可以偷到的最大金额
  // 考虑要么偷要么不偷
  // 偷的话 dp[i] = dp[i-2] + nums[i]
  // 不偷的话 d[i] = dp[i-1]
  // 因此 dp[i] = max(dp[i-1],dp[i-2]+nums[i])

  const dp: number[] = Array(nums.length + 1).fill(0)

  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])

  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
  }

  return dp[nums.length - 1]
}

function rob1(nums: number[]): number {
  const n = nums.length
  const memo = Array(n).fill(-1)
  const dfs = (i: number) => {
    if (i < 0) {
      return 0
    }
    if (memo[i] !== -1) return memo[i]
    const res = Math.max(dfs(i - 1), dfs(i - 2) + nums[i])
    memo[i] = res
    return res
  }

  return dfs(n - 1)
}

export default rob
