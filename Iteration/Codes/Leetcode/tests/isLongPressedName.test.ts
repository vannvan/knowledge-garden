/*
 * Description: 961：长按键入
 * Url: https://leetcode.cn/problems/long-pressed-name/
 * Created: 2023-03-23 23:00:27
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-23 23:12:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import isLongPressedName from '../isLongPressedName'
describe('长按键入 测试', () => {
  it('isLongPressedName function', () => {
    expect(isLongPressedName('alex', 'aaleex')).toEqual(true)
    expect(isLongPressedName('saeed', 'ssaaedd')).toEqual(false)
  })
})
