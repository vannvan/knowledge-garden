/*
 * Description: 166：分数到小数
 * Url: https://leetcode.cn/problems/fraction-to-recurring-decimal/
 * Created: 2023-03-17 17:00:05
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-17 18:08:21
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import fractionToDecimal from '../fractionToDecimal'
describe('分数到小数 测试', () => {
  it('fractionToDecimal function', () => {
    fractionToDecimal(1, 6)
    // return
    expect(fractionToDecimal(1, 2)).toEqual('0.5')
    expect(fractionToDecimal(2, 1)).toEqual('2')
    expect(fractionToDecimal(4, 333)).toEqual('0.(012)')
    // expect(fractionToDecimal(4, 322)).toEqual('0.012422360248447204')
    expect(fractionToDecimal(1, 6)).toEqual('0.1(6)')
    expect(fractionToDecimal(1, 90)).toEqual('0.0(1)')
  })
})
