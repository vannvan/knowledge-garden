/*
 * Description: 394：字符串解码
 * Url: https://leetcode.cn/problems/decode-string/
 * Created: 2023-06-03 20:27:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-06-03 21:24:53
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import decodeString from '../decodeString'
describe('字符串解码 测试', () => {
  it('decodeString function', () => {
    expect(decodeString('3[a2[c]]')).toEqual('accaccacc')
    return
    expect(decodeString('2[abc]3[cd]ef')).toEqual('abcabccdcdcdef')
    expect(decodeString('3[a]2[bc]')).toEqual('aaabcbc')
  })
})
