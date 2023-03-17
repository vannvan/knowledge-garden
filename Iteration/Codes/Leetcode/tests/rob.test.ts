/*
 * Description: 198：打家劫舍
 * Url: https://leetcode.cn/problems/house-robber/
 * Created: 2023-03-17 22:21:57
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-17 22:27:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import rob from '../rob'
describe('打家劫舍 测试', () => {
  it('rob function', () => {
    rob([1, 2, 3, 1])
    expect(rob([1, 2, 3, 1])).toEqual(4)
    expect(rob([2, 7, 9, 3, 1])).toEqual(12)
  })
})
