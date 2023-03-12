/*
 * Description: 402：移掉 K 位数字
 * Url: https://leetcode.cn/problems/remove-k-digits/
 * Created: 2023-03-12 14:57:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 15:57:51
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import removeKdigits from '../removeKdigits'
describe('移掉 K 位数字 测试', () => {
  it('removeKdigits function', () => {
    expect(removeKdigits('12345264', 5)).toEqual('122')
    expect(removeKdigits('1432219', 3)).toEqual('1219')
    expect(removeKdigits('123219', 3)).toEqual('119')
    expect(removeKdigits('10200', 1)).toEqual('200')
    expect(removeKdigits('10', 2)).toEqual('0')
  })
})
