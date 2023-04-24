/*
 * Description: 209：长度最小的子数组
 * Url: https://leetcode.cn/problems/minimum-size-subarray-sum/
 * Created: 2023-04-24 22:00:28
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-24 22:19:06
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import minSubArrayLen from '../minSubArrayLen'
describe('长度最小的子数组 测试', () => {
  it('minSubArrayLen function', () => {
    expect(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])).toEqual(2)
    expect(minSubArrayLen(4, [1, 4, 4])).toEqual(1)
    expect(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])).toEqual(0)
  })
})
