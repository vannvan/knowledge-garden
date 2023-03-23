/*
 * Description: 34：在排序数组中查找元素的第一个和最后一个位置
 * Url: https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/
 * Tags: 数组  二分查找
 * Created: 2023-03-23 20:38:11
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-23 20:46:26
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function getBorder(nums: number[], target: number, type: 'left' | 'right') {
  let left = 0
  let right = nums.length - 1
  let border = -1

  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      if (type === 'left') {
        right = mid - 1
      } else {
        left = mid + 1
      }
      border = mid
    }
  }

  return border
}

function searchRange(nums: number[], target: number): number[] {
  // Think for yourself for 5 minutes...
  let leftBorder = getBorder(nums, target, 'left')
  let rightBorder = getBorder(nums, target, 'right')
  return [leftBorder, rightBorder]
}
export default searchRange
