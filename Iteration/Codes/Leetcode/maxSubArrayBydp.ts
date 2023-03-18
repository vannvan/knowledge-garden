/*
 * Description: 53：最大子数组和
 * Url: https://leetcode.cn/problems/maximum-subarray/
 * Tags: 数组  分治  动态规划
 * Created: 2023-03-18 20:12:56
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 20:21:50
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maxSubArrayBydp(nums: number[]): number {
  // Think for yourself for 5 minutes...
  // dp[i] 表示i位置及之前的最大和
  // 两种情况 a. 前一项dp和当前项 dp[i-1] + nums[i]
  // b. nums[i]
  // 因为要依赖i-1嘛， dp[0]=nums[0]
  const n = nums.length
  if (n === 0) return 0
  const dp: number[] = Array(n).fill(0)
  dp[0] = nums[0]
  let result: number = dp[0]

  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
    result = Math.max(dp[i], result)
  }

  return result
}
export default maxSubArrayBydp
