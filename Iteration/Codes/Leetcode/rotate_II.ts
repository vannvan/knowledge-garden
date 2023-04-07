/*
 * Description: 48：旋转图像
 * Url: https://leetcode.cn/problems/rotate-image/
 * Tags: 数组  数学  矩阵
 * Created: 2023-04-07 23:16:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-07 23:22:02
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): number[][] {
  // Think for yourself for 5 minutes...
  const n = matrix.length
  // 水平翻转
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < n; j++) {
      ;[matrix[i][j], matrix[n - i - 1][j]] = [matrix[n - i - 1][j], matrix[i][j]]
    }
  }

  // 对角线反转
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      ;[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }

  return matrix
}
export default rotate
