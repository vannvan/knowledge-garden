/*
 * Description: 874：比较含退格的字符串
 * Url: https://leetcode.cn/problems/backspace-string-compare/
 * Created: 2023-03-21 20:39:55
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-21 20:40:29
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import backspaceCompare from '../backspaceCompare'
describe('比较含退格的字符串 测试', () => {
  it('backspaceCompare function', () => {
    expect(backspaceCompare('ab#c', 'ad#c')).toEqual(true)
    expect(backspaceCompare('ab##', 'c#d#')).toEqual(true)
    expect(backspaceCompare('a#c', 'b')).toEqual(false)
  })
})
