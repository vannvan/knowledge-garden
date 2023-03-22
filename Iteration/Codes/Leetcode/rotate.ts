/*
 * Description: 189：轮转数组
 * Url: https://leetcode.cn/problems/rotate-array/
 * Tags: 数组  数学  双指针
 * Created: 2023-03-22 21:51:38
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-22 22:36:27
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 Do not return anything, modify nums in-place instead.
 */
function rotate1(nums: number[], k: number): number[] {
  const n = nums.length
  const newArr = new Array(n)
  for (let i = 0; i < n; ++i) {
    newArr[(i + k) % n] = nums[i]
  }
  for (let i = 0; i < n; ++i) {
    nums[i] = newArr[i]
  }

  return nums
}
function rotate(nums: number[], k: number): number[] {
  const reverse = (nums: number[], start: number, end: number) => {
    while (start < end) {
      let tmp = nums[start]
      nums[start] = nums[end]
      nums[end] = tmp
      start++
      end--
    }
  }

  k %= nums.length

  // 先翻转全部
  reverse(nums, 0, nums.length - 1)

  // 反转前半部份
  reverse(nums, 0, k - 1)

  // 反转后半部份
  reverse(nums, k, nums.length - 1)

  return nums
}

export default rotate
