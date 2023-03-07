/*
 * Description: 递增子序列
 * Url: https://leetcode.cn/problems/non-decreasing-subsequences/
 * Created: 2023-03-07 22:03:53
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 22:23:31
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findSubsequences from '../findSubsequences'
describe('递增子序列 测试', () => {
  it('findSubsequences function', () => {
    findSubsequences([4, 6, 7, 7])
    // return
    expect(findSubsequences([4, 6, 7, 7])).toEqual(
      expect.arrayContaining([
        [4, 6],
        [4, 6, 7],
        [4, 6, 7, 7],
        [4, 7],
        [4, 7, 7],
        [6, 7],
        [6, 7, 7],
        [7, 7],
      ])
    )
    expect(findSubsequences([4, 4, 3, 2, 1])).toEqual(expect.arrayContaining([[4, 4]]))
  })
})
