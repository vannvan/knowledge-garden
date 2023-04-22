/*
 * Description: 73：矩阵置零
 * Url: https://leetcode.cn/problems/set-matrix-zeroes/
 * Tags: 数组  哈希表  矩阵
 * Created: 2023-04-22 23:21:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-22 23:35:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {
  // Think for yourself for 5 minutes...

  const m = matrix.length
  if (!m) return
  const n = matrix[0].length

  const rows = Array(m).fill(false)
  const cols = Array(n).fill(false)

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        // replace(matrix, i, j)
        rows[i] = cols[j] = true
      }
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rows[i] || cols[j]) {
        matrix[i][j] = 0
      }
    }
  }
}
export default setZeroes
