/*
 * Description: 130：被围绕的区域
 * Url: https://leetcode.cn/problems/surrounded-regions
 * Created: 2023-04-18 22:32:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-18 22:47:15
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import solve from '../solve'
describe('被围绕的区域 测试', () => {
  it('solve function', () => {
    expect(
      solve([
        ['X', 'X', 'X', 'X'],
        ['X', 'O', 'O', 'X'],
        ['X', 'X', 'O', 'X'],
        ['X', 'O', 'X', 'X'],
      ])
    ).toEqual([
      ['X', 'X', 'X', 'X'],
      ['X', 'X', 'X', 'X'],
      ['X', 'X', 'X', 'X'],
      ['X', 'O', 'X', 'X'],
    ])
    expect(solve([['X']])).toEqual([['X']])
  })
})
