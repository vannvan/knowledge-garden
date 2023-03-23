/*
 * Description: 34：在排序数组中查找元素的第一个和最后一个位置
 * Url: https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/
 * Created: 2023-03-23 20:38:11
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-23 20:46:11
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import searchRange from '../searchRange'
describe('在排序数组中查找元素的第一个和最后一个位置 测试', () => {
  it('searchRange function', () => {
    expect(searchRange([5, 7, 7, 8, 8, 10], 8)).toEqual([3, 4])
    expect(searchRange([5, 7, 7, 8, 8, 10], 6)).toEqual([-1, -1])
    expect(searchRange([], 0)).toEqual([-1, -1])
  })
})
