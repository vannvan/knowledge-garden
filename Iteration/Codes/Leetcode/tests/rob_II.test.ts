/*
 * Description: 213：打家劫舍 II
 * Url: https://leetcode.cn/problems/house-robber-ii/
 * Created: 2023-03-17 22:32:36
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-17 22:32:51
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import rob from '../rob_II'
describe('打家劫舍 II 测试', () => {
  it('rob function', () => {
    expect(rob([2, 3, 2])).toEqual(3)
    expect(rob([1, 2, 3, 1])).toEqual(4)
    expect(rob([1, 2, 3])).toEqual(3)
  })
})
