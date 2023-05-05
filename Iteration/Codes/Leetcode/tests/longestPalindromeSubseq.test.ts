/*
 * Description: 516：最长回文子序列
 * Url: https://leetcode.cn/problems/longest-palindromic-subsequence/
 * Created: 2023-03-19 13:14:32
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-05 22:50:02
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import { longestPalindromeSubseq1, longestPalindromeSubseq } from '../longestPalindromeSubseq'
describe('最长回文子序列 测试', () => {
  it('longestPalindromeSubseq function', () => {
    expect(longestPalindromeSubseq('bbbab')).toEqual(4)
    expect(longestPalindromeSubseq('cbbd')).toEqual(2)
  })

  it('longestPalindromeSubseq1 function', () => {
    expect(longestPalindromeSubseq1('bbbab')).toEqual(4)
    expect(longestPalindromeSubseq1('cbbd')).toEqual(2)
  })
})
