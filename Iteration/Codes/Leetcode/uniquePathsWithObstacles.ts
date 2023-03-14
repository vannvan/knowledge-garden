/*
 * Description: 63：不同路径 II
 * Url: https://leetcode.cn/problems/unique-paths-ii/
 * Tags: 数组  动态规划  矩阵
 * Created: 2023-03-14 22:49:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-14 23:04:45
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  // Think for yourself for 5 minutes...
  // q1. 有障碍物 1表示有障碍物
  // 当obstacleGrid[i][j] === 0的时候再执行dp[i][j]的计算

  const m: number = obstacleGrid.length
  const n: number = obstacleGrid[0].length

  if (obstacleGrid[m - 1][n - 1] == 1 || obstacleGrid[0][0] == 1) return 0

  const dp: number[][] = new Array(m).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i < m && obstacleGrid[i][0] === 0; i++) {
    dp[i][0] = 1
  }

  for (let j = 0; j < n && obstacleGrid[0][j] === 0; j++) {
    dp[0][j] = 1
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 0) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
    }
  }

  return dp[m - 1][n - 1]
}
export default uniquePathsWithObstacles
