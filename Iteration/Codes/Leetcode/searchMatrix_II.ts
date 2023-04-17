/*
 * Description: 74：搜索二维矩阵
 * Url: https://leetcode.cn/problems/search-a-2d-matrix/
 * Tags: 数组  二分查找  矩阵
 * Created: 2023-04-17 21:07:52
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-17 21:22:39
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function search(nums: number[], target: number) {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    }
  }

  return -1
}

function searchMatrix(matrix: number[][], target: number): boolean {
  // Think for yourself for 5 minutes...
  for (const row of matrix) {
    const index = search(row, target)
    if (index >= 0) {
      return true
    }
  }
  return false
}
export default searchMatrix
