/*
 * Description: 1476：统计有序矩阵中的负数
 * Url: https://leetcode.cn/problems/count-negative-numbers-in-a-sorted-matrix/
 * Created: 2023-04-16 21:16:17
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-16 21:25:18
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import countNegatives from '../countNegatives'
describe('统计有序矩阵中的负数 测试', () => {
  it('countNegatives function', () => {
    expect(
      countNegatives([
        [4, 3, 2, -1],
        [3, 2, 1, -1],
        [1, 1, -1, -2],
        [-1, -1, -2, -3],
      ])
    ).toEqual(8)
    expect(
      countNegatives([
        [3, 2],
        [1, 0],
      ])
    ).toEqual(0)
  })
})
