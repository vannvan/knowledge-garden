/*
 * Description: 540：有序数组中的单一元素
 * Url: https://leetcode.cn/problems/single-element-in-a-sorted-array/
 * Created: 2023-05-07 22:37:41
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-07 23:19:02
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import singleNonDuplicate from '../singleNonDuplicate'
describe('有序数组中的单一元素 测试', () => {
  it('singleNonDuplicate function', () => {
    expect(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8])).toEqual(2)
    expect(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11])).toEqual(10)
    expect(singleNonDuplicate([1, 1, 2, 3, 3])).toEqual(2)
  })
})
