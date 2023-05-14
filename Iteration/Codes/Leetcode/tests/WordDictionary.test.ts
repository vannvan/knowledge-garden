/*
 * Description: 211：添加与搜索单词 - 数据结构设计
 * Url: https://leetcode.cn/problems/design-add-and-search-words-data-structure/
 * Created: 2023-05-14 19:50:52
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-14 20:33:36
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import WordDictionary from '../WordDictionary'
describe('添加与搜索单词 - 数据结构设计 测试', () => {
  it('WordDictionary function', () => {
    const wordDictionary = new WordDictionary()
    wordDictionary.addWord('bad')
    wordDictionary.addWord('dad')
    wordDictionary.addWord('mad')
    expect(wordDictionary.search('pad')).toEqual(false)
    expect(wordDictionary.search('bad')).toEqual(true)
    expect(wordDictionary.search('.ad')).toEqual(true)
    expect(wordDictionary.search('b..')).toEqual(true)
  })
})
