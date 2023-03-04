/*
 * Description: 重复的子字符串
 * Url: https://leetcode.cn/problems/repeated-substring-pattern/
 * Created: 2023-03-04 15:51:09
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-04 16:34:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import repeatedSubstringPattern from '../repeatedSubstringPattern'
describe('重复的子字符串 测试', () => {
  it('repeatedSubstringPattern function', () => {
    repeatedSubstringPattern('abab')
    expect(repeatedSubstringPattern('abab')).toEqual(true)
    expect(repeatedSubstringPattern('aba')).toEqual(false)
    expect(repeatedSubstringPattern('abcabcabcabc')).toEqual(true)
  })
})
