/*
 * Description: 7：整数反转
 * Url: https://leetcode.cn/problems/reverse-integer/
 * Created: 2023-03-17 21:19:15
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-17 21:39:00
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import reverse from '../reverse'
describe('整数反转 测试', () => {
  it('reverse function', () => {
    reverse(-1203400)
    expect(reverse(123)).toEqual(321)
    expect(reverse(1463847414)).toEqual(0)
    expect(reverse(-123)).toEqual(-321)
    expect(reverse(120)).toEqual(21)
  })
})
