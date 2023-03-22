/*
 * Description: 978：有效的山脉数组
 * Url: https://leetcode.cn/problems/valid-mountain-array/
 * Created: 2023-03-22 21:18:57
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-22 21:31:36
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import validMountainArray from '../validMountainArray'
describe('有效的山脉数组 测试', () => {
  it('validMountainArray function', () => {
    expect(validMountainArray([2, 1])).toEqual(false)
    expect(validMountainArray([3, 5, 5])).toEqual(false)
    expect(validMountainArray([0, 3, 2, 1])).toEqual(true)
    expect(validMountainArray([0, 3, 2, 1, 0])).toEqual(true)
    expect(validMountainArray([0, 3, 3, 2, 1, 0])).toEqual(false)
    expect(validMountainArray([0, 3, 1, 1, 0])).toEqual(false)
    expect(validMountainArray([0, 3, 1, 4, 0])).toEqual(false)
    expect(validMountainArray([9, 8, 7, 6, 5, 4, 3, 2, 1, 0])).toEqual(false)
    expect(validMountainArray([2, 0, 2])).toEqual(false)
  })
})
