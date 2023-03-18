/*
 * Description: 1250：最长公共子序列
 * Url: https://leetcode.cn/problems/longest-common-subsequence/
 * Created: 2023-03-18 16:25:35
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 16:25:56
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import longestCommonSubsequence from '../longestCommonSubsequence'
describe('最长公共子序列 测试', () => {
  it('longestCommonSubsequence function', () => {
    expect(longestCommonSubsequence('abcde', 'ace')).toEqual(3)
    expect(longestCommonSubsequence('abc', 'abc')).toEqual(3)
    expect(longestCommonSubsequence('abc', 'def')).toEqual(0)
  })
})
