/*
 * Description: 53：最大子数组和
 * Url: https://leetcode.cn/problems/maximum-subarray/
 * Tags: 数组  分治  动态规划
 * Created: 2023-03-09 21:03:39
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-09 22:02:53
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// 此方法比较笨
function maxSubArray1(nums: number[]): number {
  // Think for yourself for 5 minutes...

  const dp: number[][] = []

  let max = 0

  const n = nums.length

  for (let i = 0; i < n; i++) {
    dp[i] = [nums[i]]
    for (let j = i + 1; j < n; j++) {
      let prev = dp[i][j - 1] == undefined ? nums[i] : dp[i][j - 1]
      let next = prev + nums[j]
      dp[i][j] = next
      max = Math.max(max, dp[i][j])
    }
    max = Math.max(max, Math.max(...dp[i].filter(Boolean)))
  }

  return max
}

function maxSubArray(nums: number[]): number {
  let max = nums[0]
  let pre = 0

  for (let i = 0; i < nums.length; i++) {
    pre = Math.max(pre + nums[i], nums[i])
    max = Math.max(pre, max)
  }

  return max
}

export default maxSubArray
