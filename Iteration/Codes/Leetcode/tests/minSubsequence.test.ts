/*
 * Description: 1519：非递增顺序的最小子序列
 * Url: https://leetcode.cn/problems/minimum-subsequence-in-non-increasing-order/
 * Created: 2023-03-16 21:29:50
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 21:45:06
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import minSubsequence from '../minSubsequence'
describe('非递增顺序的最小子序列 测试', () => {
  it('minSubsequence function', () => {
    minSubsequence([8, 8])
    expect(minSubsequence([4, 3, 10, 9, 8])).toEqual([10, 9])
    expect(minSubsequence([4, 4, 7, 6, 7])).toEqual([7, 7, 6])
    expect(minSubsequence([4, 7])).toEqual([7])
    expect(minSubsequence([4, 7, 1])).toEqual([7])
    expect(minSubsequence([4, 7, 1, 8])).toEqual([8, 7])
    expect(minSubsequence([6])).toEqual([6])
    expect(minSubsequence([8, 8])).toEqual([8, 8])
    expect(minSubsequence([8, 8, 7])).toEqual([8, 8])
  })
})
