/*
 * Description: 回文数
 * Url: https://leetcode.cn/problems/palindrome-number/
 * Created: 2023-03-08 14:57:45
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 14:58:21
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import isPalindromeNumber from '../isPalindromeNumber'
describe('回文数 测试', () => {
  it('isPalindromeNumber function', () => {
    expect(isPalindromeNumber(121)).toEqual(true)
    expect(isPalindromeNumber(-121)).toEqual(false)
    expect(isPalindromeNumber(10)).toEqual(false)
  })
})
