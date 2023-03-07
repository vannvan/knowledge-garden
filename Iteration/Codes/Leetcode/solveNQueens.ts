/*
 * Description: N 皇后
 * Url: https://leetcode.cn/problems/n-queens/
 * Tags: 数组  回溯
 * Created: 2023-03-07 23:13:20
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 23:43:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function solveNQueens(n: number): string[][] {
  // Think for yourself for 5 minutes...

  const res: string[][] = []

  const solution: string[][] = new Array(n).fill([]).map(() => new Array(n).fill('.'))

  const isSafe = (row: number, col: number, solution: string[][], n: number) => {
    // 检查列
    for (let i = 0; i < row; ++i) {
      if (solution[i][col] == 'Q') {
        return false
      }
    }

    // 检查45度对角线
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (solution[i][j] == 'Q') {
        return false
      }
    }

    // 检查135度对角线
    for (let i = row - 1, j = col + 1; i >= 0 && j <= n - 1; i--, j++) {
      if (solution[i][j] == 'Q') {
        return false
      }
    }
    return true
  }

  const formatSolution = (solution: string[][]) => {
    return [...solution].map((el) => el.join(''))
  }

  const backTrack = (row: number) => {
    if (row === n) {
      // console.log('solution', formatSolution(solution))
      res.push([...formatSolution(solution)])
      return
    }

    for (let col = 0; col < n; col++) {
      if (isSafe(row, col, solution, n)) {
        // 处理结果
        solution[row][col] = 'Q'
        backTrack(row + 1)
        // 回溯
        solution[row][col] = '.'
      }
    }
  }
  // 先从第一行开始
  backTrack(0)

  return res
}
export default solveNQueens
