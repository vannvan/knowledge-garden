/*
 * Description: 224：基本计算器
 * Url: https://leetcode.cn/problems/basic-calculator/
 * Created: 2023-05-01 21:40:01
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-01 23:03:29
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import calculate from '../calculate'
describe('基本计算器 测试', () => {
  it('calculate function', () => {
    expect(calculate('(1+(4+5+2)-3)+(6+8)')).toEqual(23)
    expect(calculate('2147483647')).toEqual(2147483647)
    expect(calculate('1 + 1')).toEqual(2)
    expect(calculate(' 2-1 + 2 ')).toEqual(3)
  })
})
