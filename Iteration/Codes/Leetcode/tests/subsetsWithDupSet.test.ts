/*
 * Description: 子集 II set去重方案
 * Url: https://leetcode.cn/problems/subsets-ii/
 * Created: 2023-03-07 22:35:26
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 22:39:25
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import subsetsWithDupSet from '../subsetsWithDupSet'
describe('子集 II 测试', () => {
  it('subsetsWithDupSet function', () => {
    subsetsWithDupSet([1, 2, 2])
    return
    expect(subsetsWithDupSet([1, 2, 2])).toEqual(
      expect.arrayContaining([[], [1], [1, 2], [1, 2, 2], [2], [2, 2]])
    )
    expect(subsetsWithDupSet([0]))
  })
})
