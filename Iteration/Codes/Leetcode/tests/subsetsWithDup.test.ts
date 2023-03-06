/*
 * Description: 子集 II
 * Url: https://leetcode.cn/problems/subsets-ii/
 * Created: 2023-03-06 22:23:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-06 22:39:02
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import subsetsWithDup from '../subsetsWithDup'
describe('子集 II 测试', () => {
  it('subsetsWithDup function', () => {
    subsetsWithDup([2, 1, 2])
    return
    expect(subsetsWithDup([1, 2, 2])).toEqual(
      expect.arrayContaining([[], [1], [1, 2], [1, 2, 2], [2], [2, 2]])
    )
    expect(subsetsWithDup([0]))
  })
})
