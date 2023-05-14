/*
 * Description: 211：添加与搜索单词 - 数据结构设计
 * Url: https://leetcode.cn/problems/design-add-and-search-words-data-structure/
 * Tags: 深度优先搜索  设计  字典树  字符串
 * Created: 2023-05-14 19:50:52
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-14 20:33:24
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class WordDictionary {
  tree: {
    isEnd?: boolean
  }
  constructor() {
    this.tree = {}
  }

  addWord(word: string): void {
    let node = this.tree
    for (const ch of word) {
      if (!node[ch]) {
        node[ch] = {}
      }
      node = node[ch]
    }
    node.isEnd = true
  }

  searchPrefix(tree: any, word: string, index: number) {
    let node = tree
    if (index === word.length) {
      return node.isEnd
    }
    const ch = word[index]
    if (ch !== '.') {
      const child = node[ch]
      if (child && this.searchPrefix(child, word, index + 1)) {
        return true
      }
    } else {
      for (const child in node) {
        // 深度遍历当前节点的下一层
        if (this.searchPrefix(node[child], word, index + 1)) {
          return true
        }
      }
    }

    return false
  }

  search(word: string): boolean {
    // 点 . 可以表示任何字段
    // 遇到点的时候，在当前节点的下一级去搜索
    return this.searchPrefix(this.tree, word, 0)
  }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
export default WordDictionary
