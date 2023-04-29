/*
 * Description: 154：寻找旋转排序数组中的最小值 II
 * Url: https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/
 * Created: 2023-04-29 21:29:47
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-29 21:30:43
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findMin from '../findMin_III'
describe('寻找旋转排序数组中的最小值 II 测试', () => {
  it('findMin function', () => {
    expect(findMin([1, 3, 5])).toEqual(1)
    expect(findMin([2, 2, 2, 0, 1])).toEqual(0)
  })
})
