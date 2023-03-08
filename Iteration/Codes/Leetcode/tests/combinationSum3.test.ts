/*
 * Description: 216：组合总和 III
 * Url: https://leetcode.cn/problems/combination-sum-iii/
 * Created: 2023-03-08 22:39:45
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 22:59:21
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import combinationSum3 from '../combinationSum3'
describe('组合总和 III 测试', () => {
  it('combinationSum3 function', () => {
    expect(combinationSum3(2, 18)).toEqual([])
    expect(combinationSum3(3, 7)).toEqual([[1, 2, 4]])
    expect(combinationSum3(3, 9)).toEqual(
      expect.arrayContaining([
        [1, 2, 6],
        [1, 3, 5],
        [2, 3, 4],
      ])
    )
    expect(combinationSum3(2, 1)).toEqual([])

    expect(combinationSum3(4, 1)).toEqual([])
  })
})
