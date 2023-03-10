/*
 * Description: 376：摆动序列
 * Url: https://leetcode.cn/problems/wiggle-subsequence/
 * Tags: 贪心  数组  动态规划
 * Created: 2023-03-10 20:53:39
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-10 23:10:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 贪心 O(n)
 * @param nums
 * @returns
 */
function wiggleMaxLength1(nums: number[]): number {
  // Think for yourself for 5 minutes...
  if (nums.length <= 1) return nums.length

  let count: number = 1

  let curDiff = 0
  let preDiff = 0

  for (let i = 0; i < nums.length; i++) {
    curDiff = nums[i + 1] - nums[i]
    // 出现峰值,拐点
    if ((preDiff <= 0 && curDiff > 0) || (preDiff >= 0 && curDiff < 0)) {
      count++
      preDiff = curDiff
    }
  }

  return count
}

/**
 * 动态规划 O(n^2)
 * @param nums
 */
function wiggleMaxLength(nums: number[]): number {
  const n = nums.length
  const dp: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0))

  for (let i = 1; i < nums.length; i++) {
    dp[0][0] = 1
    dp[0][1] = 1

    // 山谷
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[i]) {
        dp[i][1] = Math.max(dp[i][1], dp[j][0] + 1)
      }
    }

    // 山峰
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i][0] = Math.max(dp[i][0], dp[j][1] + 1)
      }
    }
  }
  return Math.max(dp[n - 1][0], dp[n - 1][1])
}

export default wiggleMaxLength
