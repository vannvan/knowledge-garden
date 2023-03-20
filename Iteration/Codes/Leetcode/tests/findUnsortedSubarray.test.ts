/*
 * Description: 581：最短无序连续子数组
 * Url: https://leetcode.cn/problems/shortest-unsorted-continuous-subarray/
 * Created: 2023-03-20 20:38:04
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-20 20:51:08
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findUnsortedSubarray from '../findUnsortedSubarray'
describe('最短无序连续子数组 测试', () => {
  it('findUnsortedSubarray function', () => {
    findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15])
    expect(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15])).toEqual(5)
    expect(findUnsortedSubarray([1, 2, 3, 4])).toEqual(0)
    expect(findUnsortedSubarray([1])).toEqual(0)
  })
})
