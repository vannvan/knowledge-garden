/*
 * Description: 1369：交换字符使得字符串相同
 * Url: https://leetcode.cn/problems/minimum-swaps-to-make-strings-equal/
 * Created: 2023-03-12 20:48:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 20:48:48
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import minimumSwap from '../minimumSwap'
describe('交换字符使得字符串相同 测试', () => {
  it('minimumSwap function', () => {
    expect(minimumSwap('xx', 'yy')).toEqual(1)
    expect(minimumSwap('xy', 'yx')).toEqual(2)
    expect(minimumSwap('xx', 'xy')).toEqual(-1)
  })
})
