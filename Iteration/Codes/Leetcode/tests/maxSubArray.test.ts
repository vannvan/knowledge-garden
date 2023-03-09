/*
 * Description: 53：最大子数组和
 * Url: https://leetcode.cn/problems/maximum-subarray/
 * Created: 2023-03-09 21:03:39
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-09 21:59:05
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxSubArray from '../maxSubArray'
describe('最大子数组和 测试', () => {
  it('maxSubArray function', () => {
    maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])
    maxSubArray([1, -2])

    expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual(6)
    expect(maxSubArray([1])).toEqual(1)
    expect(maxSubArray([5, 4, -1, 7, 8])).toEqual(23)
  })
})
