/*
 * Description: 18：四数之和
 * Url: https://leetcode.cn/problems/4sum/
 * Created: 2023-03-13 21:22:44
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 21:41:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import fourSum from '../fourSum'
describe('四数之和 测试', () => {
  it('fourSum function', () => {
    expect(fourSum([1, 0, -1, 0, -2, 2], 0)).toEqual(
      expect.arrayContaining([
        [-2, -1, 1, 2],
        [-2, 0, 0, 2],
        [-1, 0, 0, 1],
      ])
    )
    expect(fourSum([-3, -2, -1, 0, 0, 1, 2, 3], 0)).toEqual(
      expect.arrayContaining([
        [-3, -2, 2, 3],
        [-3, -1, 1, 3],
        [-3, 0, 0, 3],
        [-3, 0, 1, 2],
        [-2, -1, 0, 3],
        [-2, -1, 1, 2],
        [-2, 0, 0, 2],
        [-1, 0, 0, 1],
      ])
    )
    expect(fourSum([2, 2, 2, 2, 2], 8)).toEqual([[2, 2, 2, 2]])
  })
})
