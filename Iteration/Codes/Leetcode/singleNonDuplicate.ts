/*
 * Description: 540：有序数组中的单一元素
 * Url: https://leetcode.cn/problems/single-element-in-a-sorted-array/
 * Tags: 数组  二分查找
 * Created: 2023-05-07 22:37:41
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-07 23:21:47
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function singleNonDuplicate1(nums: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 如果一个数比它左边大比右边小，那这个数就是唯一的
  //
  let left = 0
  let right = nums.length - 1

  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] === nums[mid ^ 1]) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return nums[left]
}

function singleNonDuplicate(nums: number[]): number {
  // 成对元素中的第一个所对应的下标必然是偶数，成对元素中的第二个所对应的下标必然是奇数。
  // 如果mid位置是偶数 且 它右边相邻的数
  let left = 0
  let right = nums.length - 1
  const n = nums.length

  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2)

    if (mid % 2 === 0) {
      if (mid + 1 < n && nums[mid] === nums[mid + 1]) {
        left = mid + 1 // [mid+1,right]
      } else {
        right = mid // [left,mid]
      }
    } else {
      if (mid - 1 >= 0 && nums[mid - 1] === nums[mid]) {
        left = mid + 1 // [mid+1,right]
      } else {
        right = mid // [left,mid]
      }
    }
  }

  return nums[left]
}
export default singleNonDuplicate
