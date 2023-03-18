/*
 * Description: 53：最大子数组和
 * Url: https://leetcode.cn/problems/maximum-subarray/
 * Created: 2023-03-18 20:12:56
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 20:13:30
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxSubArrayBydp from '../maxSubArrayBydp'
describe('最大子数组和 测试', () => {
  it('maxSubArrayBydp function', () => {
    expect(maxSubArrayBydp([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual(6)
    expect(maxSubArrayBydp([1])).toEqual(1)
    expect(maxSubArrayBydp([5, 4, -1, 7, 8])).toEqual(23)
  })
})
