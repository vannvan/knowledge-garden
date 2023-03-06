/*
 * Description: 全排列 II
 * Url: https://leetcode.cn/problems/permutations-ii/
 * Created: 2023-03-06 23:01:41
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-06 23:10:45
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import permuteUnique from '../permuteUnique'
describe('全排列 II 测试', () => {
  it('permuteUnique function', () => {
    permuteUnique([1, 1, 2])
    // return
    expect(permuteUnique([1, 1, 2])).toEqual(
      expect.arrayContaining([
        [1, 1, 2],
        [1, 2, 1],
        [2, 1, 1],
      ])
    )
    expect(permuteUnique([1, 2, 3])).toEqual([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ])
  })
})
