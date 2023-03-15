/*
 * Description: 300：最长递增子序列
 * Url: https://leetcode.cn/problems/longest-increasing-subsequence/
 * Tags: 数组  二分查找  动态规划
 * Created: 2023-03-15 21:36:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-15 21:39:51
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function lengthOfLIS(nums: number[]): number {
  // Think for yourself for 5 minutes...

  // dp[i] 指的是以i结尾的最长递增子序列

  const dp: number[] = Array(nums.length).fill(1)

  let res = 0
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
    if (dp[i] > res) {
      res = dp[i]
    }
  }
  return res
}
export default lengthOfLIS
