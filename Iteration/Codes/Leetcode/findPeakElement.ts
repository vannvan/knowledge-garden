/*
 * Description: 162：寻找峰值
 * Url: https://leetcode.cn/problems/find-peak-element/
 * Tags: 数组  二分查找
 * Created: 2023-04-23 23:49:31
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-25 17:19:18
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function findPeakElement1(nums: number[]): number {
  // Think for yourself for 5 minutes...
  let left = 0
  let right = nums.length - 1
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2)
    // 当前项大于后一项，那么峰值可以往左边找，
    if (nums[mid] > nums[mid + 1]) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  return left
}

function findPeakElement2(nums: number[]): number {
  let idx = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > idx) {
      idx = i
    }
  }
  return idx
}

function findPeakElement(nums: number[]): number {
  // Think for yourself for 5 minutes...
  let left = 0
  let right = nums.length - 2
  while (left < right) {
    console.log('此次循环区间', [left, right])
    const mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1
    } else {
      right = mid + 1
    }
    console.log('此次循环结束', [left, right])
  }
  return left
}

export default findPeakElement
