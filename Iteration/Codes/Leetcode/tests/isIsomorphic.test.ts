/*
 * Description: 205：同构字符串
 * Url: https://leetcode.cn/problems/isomorphic-strings/
 * Created: 2023-03-23 21:23:07
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-23 21:32:13
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import isIsomorphic from '../isIsomorphic'
describe('同构字符串 测试', () => {
  it('isIsomorphic function', () => {
    expect(isIsomorphic('egg', 'add')).toEqual(true)
    expect(isIsomorphic('foo', 'bar')).toEqual(false)
    expect(isIsomorphic('paper', 'title')).toEqual(true)
    expect(isIsomorphic('bbbaaaba', 'aaabbbba')).toEqual(false)
  })
})
