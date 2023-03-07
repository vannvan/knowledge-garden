/*
 * Description: N 皇后
 * Url: https://leetcode.cn/problems/n-queens/
 * Created: 2023-03-07 23:13:20
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 23:39:13
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import solveNQueens from '../solveNQueens'
describe('N 皇后 测试', () => {
  it('solveNQueens function', () => {
    solveNQueens(4)
    expect(solveNQueens(4)).toEqual(
      expect.arrayContaining([
        ['.Q..', '...Q', 'Q...', '..Q.'],
        ['..Q.', 'Q...', '...Q', '.Q..'],
      ])
    )
    expect(solveNQueens(1)).toEqual([['Q']])
  })
})
