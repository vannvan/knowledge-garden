/*
 * Description: Excel表列名称
 * Url: https://leetcode.cn/problems/excel-sheet-column-title/
 * Created: 2023-03-05 18:29:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-05 21:40:17
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import convertToTitle from '../convertToTitle'
describe('Excel表列名称 测试', () => {
  it('convertToTitle function', () => {
    convertToTitle(701)
    // return
    expect(convertToTitle(2147483647)).toEqual('FXSHRXW')
    expect(convertToTitle(1)).toEqual('A')
    expect(convertToTitle(28)).toEqual('AB')
    expect(convertToTitle(701)).toEqual('ZY')
  })
})
