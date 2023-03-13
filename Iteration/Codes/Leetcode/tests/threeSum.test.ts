/*
 * Description: 15：三数之和
 * Url: https://leetcode.cn/problems/3sum/
 * Created: 2023-03-13 21:08:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 21:10:15
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import threeSum from '../threeSum'
describe('三数之和 测试', () => {
  it('threeSum function', () => {
    expect(threeSum([-1, 0, 1, 2, -1, -4])).toEqual(
      expect.arrayContaining([
        [-1, -1, 2],
        [-1, 0, 1],
      ])
    )
    expect(threeSum([0, 1, 1])).toEqual([])
    expect(threeSum([0, 0, 0])).toEqual([[0, 0, 0]])
  })
})
