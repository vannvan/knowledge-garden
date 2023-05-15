/*
 * Description: 212：单词搜索 II
 * Url: https://leetcode.cn/problems/word-search-ii/
 * Created: 2023-05-15 23:13:11
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-15 23:35:45
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findWords from '../findWords'
describe('单词搜索 II 测试', () => {
  it('findWords function', () => {
    expect(
      findWords(
        [
          ['o', 'a', 'a', 'n'],
          ['e', 't', 'a', 'e'],
          ['i', 'h', 'k', 'r'],
          ['i', 'f', 'l', 'v'],
        ],
        ['oath', 'pea', 'eat', 'rain']
      )
    ).toEqual(expect.arrayContaining(['eat', 'oath']))
    expect(
      findWords(
        [
          ['a', 'b'],
          ['c', 'd'],
        ],
        ['abcb']
      )
    ).toEqual([])
    expect(findWords([['a']], ['a'])).toEqual(['a'])
  })
})
