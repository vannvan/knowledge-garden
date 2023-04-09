/*
 * Description: 240：搜索二维矩阵 II
 * Url: https://leetcode.cn/problems/search-a-2d-matrix-ii/
 * Tags: 数组  二分查找  分治  矩阵
 * Created: 2023-04-08 20:34:41
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-08 20:50:22
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 直接搜索
 * @param matrix
 * @param target
 */
function searchMatrix1(matrix: number[][], target: number): boolean {
  // Think for yourself for 5 minutes...

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === target) return true
    }
  }

  return false
}

function search(nums: number[], target: number) {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      return mid
    }
  }

  return -1
}

/**
 * 二分查找
 * @param matrix
 * @param target
 */
function searchMatrix2(matrix: number[][], target: number): boolean {
  for (const row of matrix) {
    const index = search(row, target)
    if (index >= 0) {
      return true
    }
  }
  return false
}

/**
 * Z字形查找
 * @param matrix
 */
function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length,
    n = matrix[0].length

  let x = 0
  let y = n - 1
  while (x < m && y >= 0) {
    if (matrix[x][y] === target) {
      return true
    }

    if (matrix[x][y] > target) {
      y--
    } else {
      x++
    }
  }

  return false
}

export default searchMatrix
