/*
 * Description: 组合
 * Url: https://leetcode.cn/problems/combinations/
 * Created: 2023-03-05 22:37:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-05 23:23:18
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import combine from '../combine'
describe('组合 测试', () => {
  it('combine function', () => {
    combine(4, 2)
    // return
    expect(combine(4, 2)).toEqual([
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
      [3, 4],
    ])
    expect(combine(1, 1)).toEqual([[1]])
  })
})
