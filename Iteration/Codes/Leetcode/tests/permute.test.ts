/*
 * Description: 全排列
 * Url: https://leetcode.cn/problems/permutations/
 * Created: 2023-03-06 20:46:59
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-06 22:14:44
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import permute from '../permute'
describe('全排列 测试', () => {
  it('permute function', () => {
    permute([1, 2, 3])
    // return
    expect(permute([1, 2, 3])).toEqual(
      expect.arrayContaining([
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1],
      ])
    )
    expect(permute([0, 1])).toEqual([
      [0, 1],
      [1, 0],
    ])
    expect(permute([1])).toEqual([[1]])
  })
})
