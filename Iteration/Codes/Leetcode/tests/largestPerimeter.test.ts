/*
 * Description: 1018：三角形的最大周长
 * Url: https://leetcode.cn/problems/largest-perimeter-triangle/
 * Created: 2023-03-12 17:17:56
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 17:18:13
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import largestPerimeter from '../largestPerimeter'
describe('三角形的最大周长 测试', () => {
  it('largestPerimeter function', () => {
    expect(largestPerimeter([2, 1, 2])).toEqual(5)
    expect(largestPerimeter([1, 2, 1, 10])).toEqual(0)
  })
})
