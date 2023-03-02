/*
 * Description: 反转字符串
 * Url: https://leetcode.cn/problems/reverse-string/
 * Created: 2023-03-02 19:11:53
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-02 19:16:25
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import reverseString from '../reverseString'
describe('反转字符串 测试', () => {
  it('reverseString function', () => {
    expect(reverseString(['h', 'e', 'l', 'l', 'o'])).toEqual(['o', 'l', 'l', 'e', 'h'])

    expect(reverseString(['H', 'a', 'n', 'n', 'a', 'h'])).toEqual(['h', 'a', 'n', 'n', 'a', 'H'])
    expect(reverseString(['s'])).toEqual(['s'])
    expect(reverseString(['s', 'b'])).toEqual(['b', 's'])
  })
})
