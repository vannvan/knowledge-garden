/*
 * Description: 全排列 II
 * Url: https://leetcode.cn/problems/permutations-ii/
 * Created: 2023-03-07 22:56:23
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 23:04:52
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import permuteUniqueSet from '../permuteUniqueSet'
describe('全排列 II 测试', () => {
  it('permuteUniqueSet function', () => {
    permuteUniqueSet([1, 1, 2])
    expect(permuteUniqueSet([1, 1, 2])).toEqual(
      expect.arrayContaining([
        [1, 1, 2],
        [1, 2, 1],
        [2, 1, 1],
      ])
    )
    expect(permuteUniqueSet([1, 2, 3])).toEqual([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ])
  })
})
