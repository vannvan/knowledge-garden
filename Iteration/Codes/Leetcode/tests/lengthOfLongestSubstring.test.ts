/*
 * Description: 3：无重复字符的最长子串
 * Url: https://leetcode.cn/problems/longest-substring-without-repeating-characters/
 * Created: 2023-06-04 21:19:11
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-06-04 22:19:15
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import { lengthOfLongestSubstring, lengthOfLongestSubstring2 } from '../lengthOfLongestSubstring'
describe('无重复字符的最长子串 测试', () => {
  it('lengthOfLongestSubstring function', () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toEqual(3)
    expect(lengthOfLongestSubstring('bbbbb')).toEqual(1)
    expect(lengthOfLongestSubstring('pwwkew')).toEqual(3)
  })

  it('lengthOfLongestSubstring2 function', () => {
    expect(lengthOfLongestSubstring2('abcabcbb')).toEqual(3)
    expect(lengthOfLongestSubstring2('bbbbb')).toEqual(1)
    expect(lengthOfLongestSubstring2('pwwkew')).toEqual(3)
  })
})
