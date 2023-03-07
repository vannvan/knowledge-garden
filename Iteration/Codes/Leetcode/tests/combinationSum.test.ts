/*
 * Description: 组合总和
 * Url: https://leetcode.cn/problems/combination-sum/
 * Created: 2023-03-07 16:18:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 16:49:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import combinationSum from '../combinationSum'
describe('组合总和 测试', () => {
  it('combinationSum function', () => {
    combinationSum([2, 3, 6, 7], 7)
    expect(combinationSum([2, 3, 6, 7], 7)).toEqual(expect.arrayContaining([[2, 2, 3], [7]]))
    expect(combinationSum([2, 3, 5], 8)).toEqual(
      expect.arrayContaining([
        [2, 2, 2, 2],
        [2, 3, 3],
        [3, 5],
      ])
    )
    expect(combinationSum([2], 1)).toEqual(expect.arrayContaining([]))
  })
})
