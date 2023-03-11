/*
 * Description: 56：合并区间
 * Url: https://leetcode.cn/problems/merge-intervals/
 * Created: 2023-03-11 19:52:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 20:04:56
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import merge from '../merge'
describe('合并区间 测试', () => {
  it('merge function', () => {
    merge([
      [1, 4],
      [4, 5],
    ])
    expect(
      merge([
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
      ])
    ).toEqual([
      [1, 6],
      [8, 10],
      [15, 18],
    ])
    expect(
      merge([
        [1, 4],
        [4, 5],
      ])
    ).toEqual([[1, 5]])
  })
})
