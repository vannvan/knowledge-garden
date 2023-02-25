/*
 * Description: 数独解题
 * Created: 2023-02-25 21:26:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-25 22:38:08
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const UNASSIGNED = '.' // 还没被放的

const isSafe = (matrix: string[][], row: number, col: number, num: string) => {
  for (let row = 0; row < matrix.length; row++) {
    // 列里是否有重复
    if (matrix[row][col] === num) {
      return false
    }
  }
  for (let col = 0; col < matrix.length; col++) {
    // 行里是否有重复
    if (matrix[row][col] === num) {
      return false
    }
  }

  let startRow = row - (row % 3)
  let startCol = col - (col % 3)
  for (let i = 0; i < 3; i++) {
    // 判断9方格里是否有重复
    for (let j = 0; j < 3; j++) {
      if (matrix[i + startRow][j + startCol] === num) {
        return false
      }
    }
  }

  return true
}

const solveSudoku = (board: string[][]) => {
  let row = 0
  let col = 0
  let checkBlackSpace = false
  for (row = 0; row < board.length; row++) {
    for (col = 0; col < board[row].length; col++) {
      // 如果有空白需要跳出
      if (board[row][col] === UNASSIGNED) {
        checkBlackSpace = true
        break
      }
    }
    if (checkBlackSpace === true) {
      break
    }
  }
  // 说明没有空白，已经被解了
  if (checkBlackSpace === false) return board

  for (let num = 1; num <= 9; num++) {
    if (isSafe(board, row, col, String(num))) {
      board[row][col] = String(num)
      if (solveSudoku(board)) {
        return true
      }
      board[row][col] = UNASSIGNED
    }
  }

  return false
}

const sudokuSolver = (board: string[][]) => {
  if (solveSudoku(board)) {
    return board
  }
  return '无解'
}

export default sudokuSolver
