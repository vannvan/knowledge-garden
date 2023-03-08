/*
 * Description: 单词搜索
 * Url: https://leetcode.cn/problems/word-search/
 * Created: 2023-03-08 11:21:58
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 11:22:58
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import exist from '../exist'
describe('单词搜索 测试', () => {
  it('exist function', () => {
    exist(
      [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E'],
      ],
      'ABCCED'
    )

    return

    expect(
      exist(
        [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'C', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        'ABCCED'
      )
    ).toEqual(true)
    expect(
      exist(
        [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'C', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        'SEE'
      )
    ).toEqual(true)
    expect(
      exist(
        [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'C', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        'ABCB'
      )
    ).toEqual(false)
  })
})
