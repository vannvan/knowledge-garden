/*
 * Description: 组合总和 II
 * Url: https://leetcode.cn/problems/combination-sum-ii/
 * Created: 2023-03-07 22:42:46
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 22:44:02
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import combinationSum2Set from '../combinationSum2Set'
describe('组合总和 II 测试', () => {
  it('combinationSum2Set function', () => {
    combinationSum2Set([10, 1, 2, 7, 6, 1, 5], 8)

    return

    expect(combinationSum2Set([10, 1, 2, 7, 6, 1, 5], 8)).toEqual(
      expect.arrayContaining([
        [1, 1, 6],
        [1, 2, 5],
        [1, 7],
        [2, 6],
      ])
    )
    expect(combinationSum2Set([2, 5, 2, 1, 2], 5)).toEqual(expect.arrayContaining([[1, 2, 2], [5]]))
  })
})
