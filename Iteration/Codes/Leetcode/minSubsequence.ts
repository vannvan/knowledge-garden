/*
 * Description: 1519：非递增顺序的最小子序列
 * Url: https://leetcode.cn/problems/minimum-subsequence-in-non-increasing-order/
 * Tags: 贪心  数组  排序
 * Created: 2023-03-16 21:29:50
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 21:45:51
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function minSubsequence(nums: number[]): number[] {
  // Think for yourself for 5 minutes...
  // q1. 最大和的非递增子序列  [8,8] 也算非递增
  // q2. 子序列和要大于其他剩余子序列和

  // 先按照从大到小排个序

  nums.sort((a, b) => b - a)

  if (nums.length == 1) return nums

  let left: number = 0

  while (left < nums.length) {
    let leftSum = nums.slice(0, left + 1).reduce((prev, curr) => prev + curr)
    let rightArr = nums.slice(left + 1, nums.length)
    let rightSum = rightArr.length > 0 ? rightArr.reduce((prev, curr) => prev + curr) : 0
    if (leftSum > rightSum) {
      return nums.slice(0, left + 1)
    } else {
      left++
    }
  }

  return []
}
export default minSubsequence
