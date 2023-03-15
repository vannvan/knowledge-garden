/*
 * Description: 300：最长递增子序列
 * Url: https://leetcode.cn/problems/longest-increasing-subsequence/
 * Created: 2023-03-15 21:36:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-15 21:37:03
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import lengthOfLIS from '../lengthOfLIS'
describe('最长递增子序列 测试', () => {
  it('lengthOfLIS function', () => {
    expect(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])).toEqual(4)
    expect(lengthOfLIS([0, 1, 0, 3, 2, 3])).toEqual(4)
    expect(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])).toEqual(1)
  })
})
