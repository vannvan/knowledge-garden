/*
 * Description: 1047：K 次取反后最大化的数组和
 * Url: https://leetcode.cn/problems/maximize-sum-of-array-after-k-negations/
 * Created: 2023-03-10 23:44:57
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 00:06:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import largestSumAfterKNegations from '../largestSumAfterKNegations'
describe('K 次取反后最大化的数组和 测试', () => {
  it('largestSumAfterKNegations function', () => {
    largestSumAfterKNegations([2, -3, -1, 5, -4], 2)
    expect(largestSumAfterKNegations([4, 2, 3], 1)).toEqual(5)
    expect(largestSumAfterKNegations([3, -1, 0, 2], 3)).toEqual(6)
    expect(largestSumAfterKNegations([2, -3, -1, 5, -4], 2)).toEqual(13)
  })
})
