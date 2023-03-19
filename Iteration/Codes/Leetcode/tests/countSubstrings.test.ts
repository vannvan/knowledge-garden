/*
 * Description: 647：回文子串
 * Url: https://leetcode.cn/problems/palindromic-substrings/
 * Created: 2023-03-19 12:43:35
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-19 12:43:58
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import countSubstrings from '../countSubstrings'
describe('回文子串 测试', () => {
  it('countSubstrings function', () => {
    expect(countSubstrings('abc')).toEqual(3)
    expect(countSubstrings('aaa')).toEqual(6)
  })
})
