/*
 * Description: 1448：6 和 9 组成的最大数字
 * Url: https://leetcode.cn/problems/maximum-69-number/
 * Created: 2023-03-16 19:51:05
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 19:52:02
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maximum69Number from '../maximum69Number'
describe('6 和 9 组成的最大数字 测试', () => {
  it('maximum69Number  function', () => {
    expect(maximum69Number(9669)).toEqual(9969)
    expect(maximum69Number(9996)).toEqual(9999)
    expect(maximum69Number(9999)).toEqual(9999)
  })
})
