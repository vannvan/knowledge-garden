/*
 * Description: 200：岛屿数量
 * Url: https://leetcode.cn/problems/number-of-islands/
 * Tags: 深度优先搜索  广度优先搜索  并查集  数组  矩阵
 * Created: 2023-04-18 20:57:46
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-18 21:09:40
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function dfs(grid: string[][], r: number, c: number) {
  const nr = grid.length
  const nc = grid[0].length
  grid[r][c] = '0'
  if (r - 1 >= 0 && grid[r - 1][c] == '1') dfs(grid, r - 1, c)
  if (r + 1 < nr && grid[r + 1][c] == '1') dfs(grid, r + 1, c)
  if (c - 1 >= 0 && grid[r][c - 1] == '1') dfs(grid, r, c - 1)
  if (c + 1 < nc && grid[r][c + 1] == '1') dfs(grid, r, c + 1)
}

function numIslands(grid: string[][]): number {
  // Think for yourself for 5 minutes...
  // q1. 遇到为1的数字，以它为基准开启相邻位置的深度搜索，每经过一个相邻的位置将其标记为0
  const n = grid.length
  if (!n) return 0
  const col = grid[0].length
  let count = 0

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === '1') {
        count++
        dfs(grid, i, j)
      }
    }
  }

  return count
}
export default numIslands
