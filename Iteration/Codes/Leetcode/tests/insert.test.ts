/*
 * Description: 57：插入区间
 * Url: https://leetcode.cn/problems/insert-interval/
 * Created: 2023-06-03 21:34:20
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-06-03 21:34:44
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import insert from '../insert'
describe('插入区间 测试', () => {
  it('insert function', () => {
    expect(
      insert(
        [
          [1, 3],
          [6, 9],
        ],
        [2, 5]
      )
    ).toEqual([
      [1, 5],
      [6, 9],
    ])
    expect(
      insert(
        [
          [1, 2],
          [3, 5],
          [6, 7],
          [8, 10],
          [12, 16],
        ],
        [4, 8]
      )
    ).toEqual([
      [1, 2],
      [3, 10],
      [12, 16],
    ])
  })
})
