/*
 * Description: 12：整数转罗马数字
 * Url: https://leetcode.cn/problems/integer-to-roman/
 * Created: 2023-03-12 13:32:10
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 13:58:49
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import intToRoman from '../intToRoman'
describe('整数转罗马数字 测试', () => {
  it('intToRoman function', () => {
    expect(intToRoman(3)).toEqual('III')
    expect(intToRoman(58)).toEqual('LVIII')
    expect(intToRoman(1994)).toEqual('MCMXCIV')
  })
})
