/*
 * Description: 1：两数之和
 * Url: https://leetcode.cn/problems/two-sum/
 * Created: 2023-03-13 21:51:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 22:01:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import twoSum from '../twoSum'
describe('两数之和 测试', () => {
  it('twoSum function', () => {
    twoSum([2, 7, 11, 15], 9)
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1])
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2])
    expect(twoSum([3, 3], 6)).toEqual([0, 1])
  })
})
