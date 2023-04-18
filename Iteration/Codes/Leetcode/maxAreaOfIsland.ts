/*
 * Description: 695：岛屿的最大面积
 * Url: https://leetcode.cn/problems/max-area-of-island/
 * Tags: 深度优先搜索  广度优先搜索  并查集  数组  矩阵
 * Created: 2023-04-18 22:05:33
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-18 22:17:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function dfs(grid: number[][], i: number, j: number) {
  //由于坐标每次变化 1 个单位，所以判断是否等于数组长度即可
  const nr = grid.length
  if (!nr) return 0
  const nc = grid[0].length
  if (i === nr || i < 0) return 0
  if (j === nc || j < 0) return 0

  if (grid[i][j] == 1) {
    grid[i][j] = 0
    // 当前位置+其上下左右相邻的值
    return 1 + dfs(grid, i + 1, j) + dfs(grid, i - 1, j) + dfs(grid, i, j + 1) + dfs(grid, i, j - 1)
  }
  return 0
}

function maxAreaOfIsland(grid: number[][]): number {
  // Think for yourself for 5 minutes...
  const nr = grid.length
  if (!nr) return 0
  const nc = grid[0].length

  let maxArea = 0
  for (let row = 0; row < nr; row++) {
    for (let col = 0; col < nc; col++) {
      if (grid[row][col] === 1) {
        // 以当前位置为基准，求其辐射的面积
        const area = dfs(grid, row, col)
        maxArea = Math.max(maxArea, area)
      }
    }
  }

  return maxArea
}
export default maxAreaOfIsland
