/*
 * Description: 496：下一个更大元素 I
 * Url: https://leetcode.cn/problems/next-greater-element-i/
 * Created: 2023-03-19 15:46:03
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-19 16:46:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import nextGreaterElement from '../nextGreaterElement'
describe('下一个更大元素 I 测试', () => {
  it('nextGreaterElement function', () => {
    nextGreaterElement([2, 4], [1, 2, 3, 4])
    expect(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])).toEqual([-1, 3, -1])
    expect(nextGreaterElement([2, 4], [1, 2, 3, 4])).toEqual([3, -1])
  })
})
