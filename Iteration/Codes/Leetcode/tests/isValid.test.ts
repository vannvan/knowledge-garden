/*
 * Description: 有效的括号
 * Url: https://leetcode.cn/problems/valid-parentheses/
 * Created: 2023-03-01 22:56:39
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-01 23:37:56
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import isValid from '../isValid'
describe('有效的括号 测试', () => {
  it('isValid function', () => {
    isValid('([)]')
    // return
    expect(isValid('{[]}')).toEqual(true)
    expect(isValid('([)]')).toEqual(false)
    expect(isValid('()')).toEqual(true)
    expect(isValid('()[]{}')).toEqual(true)
    expect(isValid('(]')).toEqual(false)
  })
})
