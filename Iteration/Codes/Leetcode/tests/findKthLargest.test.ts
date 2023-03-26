/*
 * Description: 215：数组中的第K个最大元素
 * Url: https://leetcode.cn/problems/kth-largest-element-in-an-array/
 * Created: 2023-03-26 20:03:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-26 20:20:03
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findKthLargest from '../findKthLargest'
describe('数组中的第K个最大元素 测试', () => {
  it('findKthLargest function', () => {
    expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toEqual(5)
    expect(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toEqual(4)
  })
})
