/*
 * Description: 213：打家劫舍 II
 * Url: https://leetcode.cn/problems/house-robber-ii/
 * Tags: 数组  动态规划
 * Created: 2023-03-17 22:32:36
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-17 22:49:52
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function rob(nums: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 因为房屋是一圈，对于首尾可能存在影响常规的按顺序递推结果的情况，需要把去头和去尾的情况分别算出来，比较两者的大小
  if (nums.length === 1) return nums[0]
  if (nums.length === 0) return 0

  const robRange = (nums: number[], start: number, end: number) => {
    if (end == start) return nums[start]
    const dp: number[] = Array(nums.length).fill(0)

    dp[start] = nums[start]
    dp[start + 1] = Math.max(nums[start], nums[start + 1])

    for (let i = start + 2; i <= end; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
    }

    return dp[end]
  }

  const result1 = robRange(nums, 0, nums.length - 2) // 去尾
  const result2 = robRange(nums, 1, nums.length - 1) // 去头

  return Math.max(result1, result2)
}
export default rob
