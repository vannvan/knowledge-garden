/*
 * Description: 189：轮转数组
 * Url: https://leetcode.cn/problems/rotate-array/
 * Created: 2023-03-22 21:51:38
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-22 21:55:12
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import rotate from '../rotate'
describe('轮转数组 测试', () => {
  it('rotate function', () => {
    expect(rotate([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([5, 6, 7, 1, 2, 3, 4])
    expect(rotate([-1, -100, 3, 99], 2)).toEqual([3, 99, -1, -100])
  })
})
