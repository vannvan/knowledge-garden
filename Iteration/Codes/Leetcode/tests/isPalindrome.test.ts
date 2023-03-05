/*
 * Description: 验证回文串
 * Url: https://leetcode.cn/problems/valid-palindrome/
 * Created: 2023-03-05 16:39:28
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-05 17:36:21
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import isPalindrome from '../isPalindrome'
describe('验证回文串 测试', () => {
  it('isPalindrome function', () => {
    // isPalindrome('race a car')
    isPalindrome('A man, a plan, a canal: Panama')
    // return
    // return
    expect(isPalindrome('aaaa')).toEqual(true)
    expect(isPalindrome('aaa')).toEqual(true)
    expect(isPalindrome('aa')).toEqual(true)
    expect(isPalindrome('aba')).toEqual(true)
    expect(isPalindrome('absa')).toEqual(false)
    expect(isPalindrome('a')).toEqual(true)

    expect(isPalindrome('A man, a plan, a canal: Panama')).toEqual(true)
    expect(isPalindrome('race a car')).toEqual(false)
    expect(isPalindrome(' ')).toEqual(true)
  })
})
