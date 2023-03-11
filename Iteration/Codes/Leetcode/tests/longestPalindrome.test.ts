/*
 * Description: 409：最长回文串
 * Url: https://leetcode.cn/problems/longest-palindrome/
 * Created: 2023-03-11 22:05:24
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 22:12:01
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import longestPalindrome from '../longestPalindrome'
describe('最长回文串 测试', () => {
  it('longestPalindrome function', () => {
    longestPalindrome('abccccdd')
    expect(longestPalindrome('abccccdd')).toEqual(7)
    expect(longestPalindrome('a')).toEqual(1)
  })
})
