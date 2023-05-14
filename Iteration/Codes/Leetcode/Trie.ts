/*
 * Description: 208：实现 Trie (前缀树)
 * Url: https://leetcode.cn/problems/implement-trie-prefix-tree/
 * Tags: 设计  字典树  哈希表  字符串
 * Created: 2023-05-14 00:35:27
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-14 10:45:21
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class Trie {
  tree: {
    isEnd?: boolean
  }
  constructor() {
    this.tree = {}
  }

  insert(word: string): void {
    let node = this.tree
    for (const ch of word) {
      if (!node[ch]) {
        node[ch] = {}
      }
      node = node[ch]
    }
    node.isEnd = true
  }

  searchPrefix(prefix: string) {
    let node = this.tree
    for (const ch of prefix) {
      if (!node[ch]) {
        return undefined
      }
      node = node[ch]
    }
    return node
  }
  search(word: string): boolean {
    const node = this.searchPrefix(word)
    return node !== undefined && node.isEnd !== undefined
  }

  startsWith(prefix: string): boolean {
    return !!this.searchPrefix(prefix)
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
export default Trie
