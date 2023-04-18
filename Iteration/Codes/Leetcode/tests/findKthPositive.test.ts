/*
 * Description: 1646：第 k 个缺失的正整数
 * Url: https://leetcode.cn/problems/kth-missing-positive-number/
 * Created: 2023-04-17 21:26:31
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-17 21:26:46
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findKthPositive from '../findKthPositive'
describe('第 k 个缺失的正整数 测试', () => {
  it('findKthPositive function', () => {
    expect(findKthPositive([2, 3, 4, 7, 11], 5)).toEqual(9)
    expect(findKthPositive([1, 2, 3, 4], 2)).toEqual(6)
  })
})
