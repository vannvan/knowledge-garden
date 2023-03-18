/*
 * Description: 674：最长连续递增序列
 * Url: https://leetcode.cn/problems/longest-continuous-increasing-subsequence/
 * Tags: 数组
 * Created: 2023-03-18 15:59:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 16:03:09
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function findLengthOfLCIS(nums: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 考虑需要连续递增的子序列
  // q2. dp[i] 表示以nums[i]结尾的连续递增子序列
  // dp[i] = dp[i-1]+1

  const n: number = nums.length
  const dp: number[] = Array(n).fill(1)

  let result: number = 0
  for (let i = 0; i < n; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1
    }
    if (dp[i] > result) {
      result = dp[i]
    }
  }

  return result
}
export default findLengthOfLCIS
