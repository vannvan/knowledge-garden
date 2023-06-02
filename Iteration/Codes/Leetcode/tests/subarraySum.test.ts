/*
 * Description: 560：和为 K 的子数组
 * Url: https://leetcode.cn/problems/subarray-sum-equals-k/
 * Created: 2023-06-02 21:57:27
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-06-02 22:10:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import { subarraySum, subarraySumPref } from '../subarraySum'
describe('和为 K 的子数组 测试', () => {
  it('subarraySum function', () => {
    expect(subarraySum([1, 1, 1], 2)).toEqual(2)
    expect(subarraySum([1, 2, 3], 3)).toEqual(2)
  })

  it('subarraySumPref function', () => {
    expect(subarraySumPref([1, 1, 1], 2)).toEqual(2)
    expect(subarraySumPref([1, 2, 3], 3)).toEqual(2)
  })
})
