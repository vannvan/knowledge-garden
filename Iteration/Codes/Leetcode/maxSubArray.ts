/*
 * Description: 53：最大子数组和
 * Url: https://leetcode.cn/problems/maximum-subarray/
 * Tags: 数组  分治  动态规划
 * Created: 2023-03-10 23:26:56
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-10 23:42:43
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maxSubArray1(nums: number[]): number {
  let max = nums[0]
  let pre = 0

  for (let i = 0; i < nums.length; i++) {
    pre = Math.max(pre + nums[i], nums[i])
    max = Math.max(pre, max)
  }

  return max
}

function maxSubArray(nums: number[]): number {
  let count = 0
  let res = Number.MIN_SAFE_INTEGER

  for (let i = 0; i < nums.length; i++) {
    count += nums[i]

    if (count > res) {
      res = count //  取区间累计的最大值（相当于不断确定最大子序终止位置)
    }
    if (count <= 0) count = 0 // 相当于重置最大子序起始位置，因为遇到负数一定是拉低总和
  }

  return res
}

export default maxSubArray
