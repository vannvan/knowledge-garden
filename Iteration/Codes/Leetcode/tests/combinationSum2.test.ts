/*
 * Description: 组合总和 II
 * Url: https://leetcode.cn/problems/combination-sum-ii/
 * Created: 2023-03-06 23:24:45
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-06 23:31:06
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import combinationSum2 from '../combinationSum2'
describe('组合总和 II 测试', () => {
  it('combinationSum2 function', () => {
    combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)
    // return
    expect(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)).toEqual(
      expect.arrayContaining([
        [1, 1, 6],
        [1, 2, 5],
        [1, 7],
        [2, 6],
      ])
    )
    expect(combinationSum2([2, 5, 2, 1, 2], 5)).toEqual(expect.arrayContaining([[1, 2, 2], [5]]))
  })
})
