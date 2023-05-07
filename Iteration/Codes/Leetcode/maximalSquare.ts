/*
 * Description: 221：最大正方形
 * Url: https://leetcode.cn/problems/maximal-square/
 * Tags: 数组  动态规划  矩阵
 * Created: 2023-05-07 20:55:53
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-07 22:19:30
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 最大岛屿面积思路，超时
 * @param matrix
 * @returns
 */
function maximalSquare(matrix: string[][]): number {
  // Think for yourself for 5 minutes...
  // q1. 能构成正方向说明[i,i+n]和[j,j+n]区间内的数字全都是1
  // q2. 迭代更新可构成正方形的 边长 就是n
  // q3. 遇到[i][j]位置为1，要构成正方形，就要 右 下 右下角 三个位置都为1
  const nr = matrix.length
  if (!nr) return 0
  const nc = matrix[0].length
  const visited = {}

  const dfs = (grid: string[][], i: number, j: number) => {
    if (i === nr || i < 0) return 0
    if (j === nc || j < 0) return 0
    if (visited[`${i}_${j}`]) return visited[`${i}_${j}`]
    if (grid[i][j] === '1') {
      const s = 1 + Math.min(dfs(grid, i + 1, j), dfs(grid, i, j + 1), dfs(grid, i + 1, j + 1))
      visited[`${i}_${j}`] = s
      return s
    }

    return 0
  }

  let maxlen = 0

  for (let row = 0; row < nr; row++) {
    for (let col = 0; col < nc; col++) {
      if (matrix[row][col] === '1') {
        // 以当前位置为基准，求其辐射的面积
        const len = dfs(matrix, row, col)
        maxlen = Math.max(maxlen, len)
      }
    }
  }

  return maxlen * maxlen
}

function maximalSquare1(matrix: string[][]): number {
  const m = matrix.length
  const n = matrix[0].length

  const dp: number[][] = Array.from(Array(m), () => Array(n).fill(0))

  let maxEdgeLength = 0

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === '1') {
        if (i === 0 || j === 0) {
          dp[i][j] = 1
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
        }
        maxEdgeLength = Math.max(maxEdgeLength, dp[i][j])
      }
    }
  }
  return Math.pow(maxEdgeLength, 2)
}
export { maximalSquare, maximalSquare1 }
