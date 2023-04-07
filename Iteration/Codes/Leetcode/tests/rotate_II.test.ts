/*
 * Description: 48：旋转图像
 * Url: https://leetcode.cn/problems/rotate-image/
 * Created: 2023-04-07 23:16:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-07 23:16:59
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import rotate from '../rotate_II'
describe('旋转图像 测试', () => {
  it('rotate function', () => {
    expect(
      rotate([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])
    ).toEqual([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ])
    expect(
      rotate([
        [5, 1, 9, 11],
        [2, 4, 8, 10],
        [13, 3, 6, 7],
        [15, 14, 12, 16],
      ])
    ).toEqual([
      [15, 13, 2, 5],
      [14, 3, 4, 1],
      [12, 6, 8, 9],
      [16, 7, 10, 11],
    ])
  })
})
