/*
 * Description: 1476：统计有序矩阵中的负数
 * Url: https://leetcode.cn/problems/count-negative-numbers-in-a-sorted-matrix/
 * Tags: 数组  二分查找  矩阵
 * Created: 2023-04-16 21:16:17
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-16 21:38:47
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function countNegatives1(grid: number[][]): number {
  // Think for yourself for 5 minutes...

  let count = 0
  for (let i = 0; i < grid.length; i++) {
    let p = 0
    while (p < grid[i].length && grid[i][p] >= 0) {
      p++
    }
    count += grid[i].length - p
  }
  return count
}

function countNegatives(grid: number[][]): number {
  const n = grid.length
  let count = 0

  for (let i = 0; i < n; i++) {
    let left = 0
    let right = grid[i].length - 1
    let pos = -1
    while (left <= right) {
      const mid = Math.floor(left + (right - left) / 2)
      if (grid[i][mid] < 0) {
        pos = mid
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    if (pos != -1) {
      count += grid[i].length - pos
    }
  }

  return count
}
export default countNegatives
