/*
 * Description: 290：单词规律
 * Url: https://leetcode.cn/problems/word-pattern/
 * Created: 2023-04-28 21:12:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-28 21:33:26
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import wordPattern from '../wordPattern'
describe('单词规律 测试', () => {
  it('wordPattern function', () => {
    expect(wordPattern('abba', 'dog cat cat dog')).toEqual(true)
    expect(wordPattern('abba', 'dog cat cat fish')).toEqual(false)
    expect(wordPattern('aaaa', 'dog cat cat dog')).toEqual(false)
  })
})
