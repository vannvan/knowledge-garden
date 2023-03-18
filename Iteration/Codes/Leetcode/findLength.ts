/*
 * Description: 718：最长重复子数组
 * Url: https://leetcode.cn/problems/maximum-length-of-repeated-subarray/
 * Tags: 数组  二分查找  动态规划  滑动窗口  哈希函数  滚动哈希
 * Created: 2023-03-18 16:04:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 16:23:45
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function findLength1(nums1: number[], nums2: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 子数组=连续子序列
  // dp[i][j] ：以下标i - 1为结尾的A，和以下标j - 1为结尾的B，最长重复子数组长度为dp[i][j]。
  // 当A[i-1]===B[j-1]的时候，dp[i][j] = dp[i-1][j-1] + 1
  const dp: number[][] = Array(nums1.length + 1)
    .fill([])
    .map(() => Array(nums2.length + 1).fill(0))
  let result: number = 0

  for (let i = 1; i <= nums1.length; i++) {
    for (let j = 1; j <= nums2.length; j++) {
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      }
      result = dp[i][j] > result ? dp[i][j] : result
    }
  }
  return result
}

/**
 * 滚动数组优化版
 * @param nums1
 * @param nums2
 */
function findLength(nums1: number[], nums2: number[]): number {
  const dp: number[] = Array(nums2.length + 1).fill(0)

  let result: number = 0

  for (let i = 1; i <= nums1.length; i++) {
    for (let j = nums2.length; j > 0; j--) {
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[j] = dp[j - 1] + 1
      } else {
        dp[j] = 0
      }
      result = dp[j] > result ? dp[j] : result
    }
  }
  return result
}

export default findLength
