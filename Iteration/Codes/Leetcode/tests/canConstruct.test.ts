/*
 * Description: 383：赎金信
 * Url: https://leetcode.cn/problems/ransom-note/
 * Created: 2023-03-13 20:57:46
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 21:02:38
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import canConstruct from '../canConstruct'
describe('赎金信 测试', () => {
  it('canConstruct function', () => {
    expect(canConstruct('a', 'b')).toEqual(false)
    expect(canConstruct('aa', 'ab')).toEqual(false)
    expect(canConstruct('aa', 'aab')).toEqual(true)
  })
})
