/*
 * Description: 153：寻找旋转排序数组中的最小值
 * Url: https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/
 * Created: 2023-04-25 23:50:17
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-25 23:50:36
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findMin from '../findMin'
describe('寻找旋转排序数组中的最小值 测试', () => {
  it('findMin function', () => {
    expect(findMin([3, 4, 5, 1, 2])).toEqual(1)
    expect(findMin([4, 5, 6, 7, 0, 1, 2])).toEqual(0)
    expect(findMin([11, 13, 15, 17])).toEqual(11)
  })
})
