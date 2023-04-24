/*
 * Description: 289：生命游戏
 * Url: https://leetcode.cn/problems/game-of-life/
 * Tags: 数组  矩阵  模拟
 * Created: 2023-04-24 22:31:04
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-24 22:49:48
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 Do not return anything, modify board in-place instead.
 */
function gameOfLife(board: number[][]): number[][] {
  // Think for yourself for 5 minutes...
  // q1. 统计其他位置的1的个数
  // count < 2, 将当前位置1变成0
  // count === 2 || count === 3 当前位置是1 保持不变
  // count > 3 当前位置1变成0
  // count === 3 当前位置0变成1
  // 怎样原地？

  // 先统计出每个单元格8个位置活细胞的数量

  let m = board.length
  let n = board[0].length

  let counts = Array.from(Array(m), () => Array(n).fill(0))

  const getCount = (board: number[][], row: number, col: number) => {
    let count = 0
    // 左上角
    if (col - 1 >= 0 && row - 1 >= 0 && board[row - 1][col - 1] === 1) count++
    // 右上角
    if (col + 1 < n && row - 1 >= 0 && board[row - 1][col + 1] === 1) count++
    // 左下角
    if (col - 1 >= 0 && row + 1 < m && board[row + 1][col - 1] === 1) count++
    // 右下角
    if (col + 1 < n && row + 1 < m && board[row + 1][col + 1] === 1) count++
    // 上方
    if (row - 1 >= 0 && board[row - 1][col] === 1) count++
    // 下方
    if (row + 1 < m && board[row + 1][col] === 1) count++
    // 左侧
    if (col - 1 >= 0 && board[row][col - 1] === 1) count++
    // 右侧
    if (col + 1 < n && board[row][col + 1] === 1) count++
    return count
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      counts[row][col] = getCount(board, row, col)
    }
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      let cnt = counts[row][col]
      if (board[row][col] === 1 && (cnt > 3 || cnt < 2)) {
        board[row][col] = 0
      } else if (board[row][col] === 0 && cnt === 3) {
        board[row][col] = 1
      }
    }
  }

  return board
}
export default gameOfLife
