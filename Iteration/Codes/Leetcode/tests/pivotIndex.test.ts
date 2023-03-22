/*
 * Description: 724：寻找数组的中心下标
 * Url: https://leetcode.cn/problems/find-pivot-index/
 * Created: 2023-03-22 22:50:35
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-22 23:20:45
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import pivotIndex from '../pivotIndex'
describe('寻找数组的中心下标 测试', () => {
  it('pivotIndex function', () => {
    expect(pivotIndex([-1, -1, -1, -1, -1, 0])).toEqual(2)
    expect(pivotIndex([1, 7, 3, 6, 5, 6])).toEqual(3)
    expect(pivotIndex([1, 2, 3])).toEqual(-1)
    expect(pivotIndex([2, 1, -1])).toEqual(0)
  })
})
