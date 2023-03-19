/*
 * Description: 503：下一个更大元素 II
 * Url: https://leetcode.cn/problems/next-greater-element-ii/
 * Created: 2023-03-19 17:43:02
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-19 18:22:51
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import nextGreaterElementsIi from '../nextGreaterElementsIi'
describe('下一个更大元素 II 测试', () => {
  it('nextGreaterElementsIi function', () => {
    expect(nextGreaterElementsIi([1, 2, 1])).toEqual([2, -1, 2])
    expect(nextGreaterElementsIi([1, 2, 3, 4, 3])).toEqual([2, 3, 4, -1, 4])
  })
})
