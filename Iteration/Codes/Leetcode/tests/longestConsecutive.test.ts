/*
 * Description: 128：最长连续序列
 * Url: https://leetcode.cn/problems/longest-consecutive-sequence/
 * Created: 2023-03-09 22:06:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-09 22:40:05
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import longestConsecutive from '../longestConsecutive'
describe('最长连续序列 测试', () => {
  it('longestConsecutive function', () => {
    longestConsecutive([100, 4, 200, 1, 3, 2])
    expect(longestConsecutive([100, 4, 200, 1, 3, 2])).toEqual(4)
    expect(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])).toEqual(9)
    expect(longestConsecutive([9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6])).toEqual(7)
  })
})
