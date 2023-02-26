/*
 * Description: 在排序数组中查找元素的第一个和最后一个位置
 * https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/
 * Created: 2023-02-26 14:13:30
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 14:44:56
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class SearchRange {
  nums: number[]
  target: number
  constructor(nums: number[], target: number) {
    this.nums = nums
    this.target = target
  }

  getRange() {
    let leftBorder = this.getLeftBorder()
    let rightBorder = this.getRightBorder()

    if (leftBorder === -2 && rightBorder === -2) return [-1, -1]
    if (rightBorder - leftBorder > 1) {
      return [leftBorder + 1, rightBorder - 1]
    }

    return [-1, -1]
  }

  getLeftBorder() {
    let left = 0
    let right = this.nums.length - 1
    let leftBorder = -2
    while (left <= right) {
      let mid = Math.floor(left + (right - left) / 2)
      if (this.nums[mid] >= this.target) {
        right = mid - 1 // 寻找左边界，就要在nums[mid] == target的时候更新right
        leftBorder = right
      } else {
        left = mid + 1
      }
    }
    return leftBorder
  }

  getRightBorder() {
    let left = 0
    let right = this.nums.length - 1
    let rightBorder = -2 //记录一下rightBorder没有被赋值的情况
    while (left <= right) {
      let mid = Math.floor(left + (right - left) / 2)
      if (this.nums[mid] > this.target) {
        right = mid - 1 // target 在左区间，所以[left, middle - 1]
      } else {
        left = mid + 1
        rightBorder = left
      }
    }
    return rightBorder
  }
}

export default SearchRange
