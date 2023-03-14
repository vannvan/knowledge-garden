/*
 * Description: 62：不同路径
 * Url: https://leetcode.cn/problems/unique-paths/
 * Tags: 数学  动态规划  组合数学
 * Created: 2023-03-14 22:32:09
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-14 22:46:47
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function uniquePaths(m: number, n: number): number {
  // Think for yourself for 5 minutes...
  // q1. 只能向右和向下
  // q2. dp[i-1][j] 表示从[0,0] 到[i-1,j] 的路径条数
  // dp[i][j-1] 表示从[0,0] 到[i,j-1] 的路径条数
  // 因此 dp[i][j] = dp[i-1][j] + dp[i][j-1]
  const dp: number[][] = new Array(m).fill(0).map(() => new Array(n).fill(0))

  // 也可以在上面全部初始化为1可以省略下面两个步骤

  // 第一行的路径
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1
  }

  // 第一列的路径
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }

  return dp[m - 1][n - 1]
}
export default uniquePaths
