/*
 * Description: 680：验证回文串 II
 * Url: https://leetcode.cn/problems/valid-palindrome-ii/
 * Created: 2023-03-12 16:08:03
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 16:22:11
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import validPalindrome from '../validPalindrome'
describe('验证回文串 II 测试', () => {
  it('validPalindrome function', () => {
    validPalindrome('abc')
    expect(validPalindrome('aba')).toEqual(true)
    expect(validPalindrome('abc')).toEqual(false)

    expect(validPalindrome('abba')).toEqual(true)
    expect(validPalindrome('abbaa')).toEqual(true)
    expect(validPalindrome('abbaac')).toEqual(false)
    expect(validPalindrome('cabbaac')).toEqual(true)

    expect(validPalindrome('abca')).toEqual(true)
    expect(validPalindrome('abc')).toEqual(false)
  })
})
