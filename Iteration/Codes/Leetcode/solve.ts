/*
 * Description: 130：被围绕的区域
 * Url: https://leetcode.cn/problems/surrounded-regions
 * Tags: 深度优先搜索  广度优先搜索  并查集  数组  矩阵
 * Created: 2023-04-18 22:32:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-18 22:59:39
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function dfs(board: string[][], r: number, c: number) {
  const nr = board.length
  const nc = board[0].length

  if (board[r][c] === 'X' || board[r][c] === '#') return

  board[r][c] = '#'
  // 上
  if (r - 1 >= 0) dfs(board, r - 1, c)
  // 下，往下不能超过总行数
  if (r + 1 < nr) dfs(board, r + 1, c)
  // 左
  if (c - 1 >= 0) dfs(board, r, c - 1)
  // 右，往右不能超过总列数
  if (c + 1 < nc) dfs(board, r, c + 1)
}

/**
 Do not return anything, modify board in-place instead.
 */
function solve(board: string[][]) {
  // Think for yourself for 5 minutes...
  // q1. 转换为求解不在边界上的O和其相邻的O的位置，剩下的就都是被X包围的了
  const nr = board.length
  if (!nr) return
  const nc = board[0].length

  // 1 先把边界为O且和这个O相邻的打上标识
  for (let row = 0; row < nr; row++) {
    for (let col = 0; col < nc; col++) {
      // 是否在边界上
      const isEdge = row === 0 || row === nr - 1 || col === 0 || col == nc - 1
      if (isEdge && board[row][col] === 'O') {
        dfs(board, row, col)
      }
    }
  }
  // 2 将那些打了标识的还原为O，剩下的替换成X
  for (let row = 0; row < nr; row++) {
    for (let col = 0; col < nc; col++) {
      if (board[row][col] === 'O') {
        board[row][col] = 'X'
      } else if (board[row][col] === '#') {
        board[row][col] = 'O'
      }
    }
  }

  return board
}
export default solve
