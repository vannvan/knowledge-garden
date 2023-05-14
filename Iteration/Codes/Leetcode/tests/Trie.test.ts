/*
 * Description: 208：实现 Trie (前缀树)
 * Url: https://leetcode.cn/problems/implement-trie-prefix-tree/
 * Created: 2023-05-14 00:35:27
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-14 10:45:06
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import Trie from '../Trie'
describe('实现 Trie (前缀树) 测试', () => {
  it('Trie function', () => {
    const trie = new Trie()
    trie.insert('apple')
    // trie.search("apple");   // 返回 True
    // trie.search("app");     // 返回 False
    // trie.startsWith("app"); // 返回 True
    // trie.insert("app");
    // trie.search("app");     // 返回 True
    expect(trie.search('apple')).toEqual(true)
    expect(trie.search('app')).toEqual(false)
    expect(trie.startsWith('app')).toEqual(true)
    expect(trie.insert('app'))
    expect(trie.search('app')).toEqual(true)
  })
})
