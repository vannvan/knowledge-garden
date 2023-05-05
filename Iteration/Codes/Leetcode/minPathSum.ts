/*
 * Description: 64：最小路径和
 * Url: https://leetcode.cn/problems/minimum-path-sum/
 * Tags: 数组  动态规划  矩阵
 * Created: 2023-05-05 23:14:30
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-05 23:49:28
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function minPathSum(grid: number[][]): number {
  // Think for yourself for 5 minutes...
  // q1. dp[i][j] 表示[i][j]位置的最小路径和
  // q2. 第一行的最小路径和就是当前项 + 之前列的和，第一列同理
  // q3. dp[i][j] 左上方+当前值 / 左侧+当前值
  // q3. 坐上角[0][0]位置的和就是它自己，先算出来方便计算
  const m = grid.length
  const n = grid[0].length

  const dp = Array.from(Array(m), () => Array(n).fill(0))

  dp[0][0] = grid[0][0]

  for (let i = 1; i < m; i++) {
    // dp[i][0] = i == 0 ? grid[0][0] : dp[i - 1][0] + grid[i][0]
    dp[i][0] = dp[i - 1][0] + grid[i][0]
  }

  for (let j = 1; j < n; j++) {
    // dp[0][j] = j == 0 ? grid[0][0] : dp[0][j - 1] + grid[0][j]
    dp[0][j] = dp[0][j - 1] + grid[0][j]
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    }
  }

  return dp[m - 1][n - 1]
}

/**
 * 空间优化
 * @param grid
 */
function minPathSum1(grid: number[][]): number {
  const m = grid.length
  const n = grid[0].length
  const dp = Array(n).fill(0)

  dp[0] = grid[0][0]

  for (let i = 1; i < n; i++) {
    dp[i] = dp[i - 1] + grid[0][i]
  }

  for (let i = 1; i < m; i++) {
    dp[0] = dp[0] + grid[i][0]
    for (let j = 1; j < n; j++) {
      dp[j] = Math.min(dp[j - 1] + grid[i][j], dp[j] + grid[i][j])
    }
  }

  return dp[n - 1]
}
export { minPathSum, minPathSum1 }
