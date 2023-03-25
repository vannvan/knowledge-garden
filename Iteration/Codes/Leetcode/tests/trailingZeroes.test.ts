/*
 * Description: 172：阶乘后的零
 * Url: https://leetcode.cn/problems/factorial-trailing-zeroes/
 * Created: 2023-03-25 16:14:30
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 16:15:34
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import trailingZeroes from '../trailingZeroes'
describe('阶乘后的零 测试', () => {
  it('trailingZeroes function', () => {
    expect(trailingZeroes(3)).toEqual(0)
    expect(trailingZeroes(25)).toEqual(6)
    expect(trailingZeroes(5)).toEqual(1)
    expect(trailingZeroes(0)).toEqual(0)
  })
})
