/*
 * Description: 36：有效的数独
 * Url: https://leetcode.cn/problems/valid-sudoku/
 * Tags: 数组  哈希表  矩阵
 * Created: 2023-04-22 00:13:43
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-22 00:33:56
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function isValidSudoku(board: string[][]): boolean {
  // Think for yourself for 5 minutes...
  // 按照行、列、3x3宫内对每个数字计数，当其超过1个就返回false
  const rows = Array.from(Array(9), () => Array(9).fill(0))
  const cols = Array.from(Array(9), () => Array(9).fill(0))
  const subBoxes = Array(3)
    .fill(0)
    .map(() =>
      Array(3)
        .fill(0)
        .map(() => Array(9).fill(0))
    )

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cur = board[i][j]
      if (cur !== '.') {
        const index = cur.charCodeAt(0) - '0'.charCodeAt(0) - 1
        rows[i][index]++
        cols[j][index]++
        subBoxes[Math.floor(i / 3)][Math.floor(j / 3)][index]++
        if (
          rows[i][index] > 1 ||
          cols[j][index] > 1 ||
          subBoxes[Math.floor(i / 3)][Math.floor(j / 3)][index] > 1
        ) {
          return false
        }
      }
    }
  }

  return true
}
export default isValidSudoku
