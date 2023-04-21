/*
 * Description: 167：两数之和 II - 输入有序数组
 * Url: https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/
 * Created: 2023-04-21 23:36:10
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-21 23:36:31
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import twoSum from '../twoSum_II'
describe('两数之和 II - 输入有序数组 测试', () => {
  it('twoSum function', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([1, 2])
    expect(twoSum([2, 3, 4], 6)).toEqual([1, 3])
    expect(twoSum([-1, 0], -1)).toEqual([1, 2])
  })
})
