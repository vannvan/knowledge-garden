/*
 * Description: 406：根据身高重建队列
 * Url: https://leetcode.cn/problems/queue-reconstruction-by-height/
 * Created: 2023-03-11 16:44:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 17:03:45
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import reconstructQueue from '../reconstructQueue'
describe('根据身高重建队列 测试', () => {
  it('reconstructQueue function', () => {
    expect(
      reconstructQueue([
        [7, 0],
        [4, 4],
        [7, 1],
        [5, 0],
        [6, 1],
        [5, 2],
      ])
    ).toEqual([
      [5, 0],
      [7, 0],
      [5, 2],
      [6, 1],
      [4, 4],
      [7, 1],
    ])
    expect(
      reconstructQueue([
        [6, 0],
        [5, 0],
        [4, 0],
        [3, 2],
        [2, 2],
        [1, 4],
      ])
    ).toEqual(
      expect.arrayContaining([
        [4, 0],
        [5, 0],
        [2, 2],
        [3, 2],
        [1, 4],
        [6, 0],
      ])
    )
  })
})
