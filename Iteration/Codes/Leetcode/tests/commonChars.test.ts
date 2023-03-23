/*
 * Description: 1044：查找共用字符
 * Url: https://leetcode.cn/problems/find-common-characters/
 * Created: 2023-03-23 21:52:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-23 22:35:31
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import commonChars from '../commonChars'
describe('查找共用字符 测试', () => {
  it('commonChars function', () => {
    expect(commonChars(['bella', 'label', 'roller'])).toEqual(['e', 'l', 'l'])
    return
    expect(commonChars(['cool', 'lock', 'cook'])).toEqual(['c', 'o'])
  })
})
