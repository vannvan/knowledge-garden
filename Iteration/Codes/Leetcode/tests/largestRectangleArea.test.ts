/*
 * Description: 84：柱状图中最大的矩形
 * Url: https://leetcode.cn/problems/largest-rectangle-in-histogram/
 * Created: 2023-03-19 22:04:31
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-19 22:04:49
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import largestRectangleArea from '../largestRectangleArea'
describe('柱状图中最大的矩形 测试', () => {
  it('largestRectangleArea function', () => {
    expect(largestRectangleArea([2, 1, 5, 6, 2, 3])).toEqual(10)
    expect(largestRectangleArea([2, 4])).toEqual(4)
  })
})
