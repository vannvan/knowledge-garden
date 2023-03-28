/*
 * Description: 5：最长回文子串
 * Url: https://leetcode.cn/problems/longest-palindromic-substring/
 * Created: 2023-03-28 22:19:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-28 23:19:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import longestPalindrome from '../longestPalindrome_II'
describe('最长回文子串 测试', () => {
  it('longestPalindrome function', () => {
    const s = ['aba', 'bab'].includes(longestPalindrome('babad'))
    expect(s).toEqual(true)
    expect(longestPalindrome('cbbd')).toEqual('bb')
  })
})
