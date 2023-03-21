/*
 * Description: 316：去除重复字母
 * Url: https://leetcode.cn/problems/remove-duplicate-letters/
 * Created: 2023-03-21 22:57:51
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-21 23:39:27
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import removeDuplicateLetters from '../removeDuplicateLetters'
describe('去除重复字母 测试', () => {
  it('removeDuplicateLetters function', () => {
    removeDuplicateLetters('cbacdcbc')
    expect(removeDuplicateLetters('bcabc')).toEqual('abc')
    expect(removeDuplicateLetters('cbacdcbc')).toEqual('acdb')
  })
})
