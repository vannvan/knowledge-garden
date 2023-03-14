/*
 * Description: 343：整数拆分
 * Url: https://leetcode.cn/problems/integer-break/
 * Created: 2023-03-14 23:07:46
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-14 23:08:30
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import integerBreak from '../integerBreak'
describe('整数拆分 测试', () => {
  it('integerBreak function', () => {
    expect(integerBreak(2)).toEqual(1)
    expect(integerBreak(10)).toEqual(36)
  })
})
