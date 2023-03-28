/*
 * Description: 13：罗马数字转整数
 * Url: https://leetcode.cn/problems/roman-to-integer/
 * Created: 2023-03-28 23:24:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-28 23:33:14
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import romanToInt from '../romanToInt'
describe('罗马数字转整数 测试', () => {
  it('romanToInt function', () => {
    expect(romanToInt('III')).toEqual(3)
    expect(romanToInt('LVIII')).toEqual(58)
    expect(romanToInt('MCMXCIV')).toEqual(1994)
  })
})
