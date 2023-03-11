/*
 * Description: 738：单调递增的数字
 * Url: https://leetcode.cn/problems/monotone-increasing-digits/
 * Created: 2023-03-11 21:20:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 21:41:50
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import monotoneIncreasingDigits from '../monotoneIncreasingDigits'
describe('单调递增的数字 测试', () => {
  it('monotoneIncreasingDigits function', () => {
    monotoneIncreasingDigits(10)
    expect(monotoneIncreasingDigits(10)).toEqual(9)
    expect(monotoneIncreasingDigits(1234)).toEqual(1234)
    expect(monotoneIncreasingDigits(332)).toEqual(299)
  })
})
