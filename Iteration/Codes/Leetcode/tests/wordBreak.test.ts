/*
 * Description: 139：单词拆分
 * Url: https://leetcode.cn/problems/word-break/
 * Created: 2023-04-09 20:40:59
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-09 21:01:50
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import wordBreak from '../wordBreak'
describe('单词拆分 测试', () => {
  it('wordBreak function', () => {
    wordBreak('leetcode', ['leet', 'dode'])
    expect(wordBreak('leetcode', ['leet', 'code'])).toEqual(true)
    expect(wordBreak('applepenapple', ['apple', 'pen'])).toEqual(true)
    expect(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])).toEqual(false)
  })
})
