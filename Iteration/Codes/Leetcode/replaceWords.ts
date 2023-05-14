/*
 * Description: 648：单词替换
 * Url: https://leetcode.cn/problems/replace-words/
 * Tags: 字典树  数组  哈希表  字符串
 * Created: 2023-05-13 23:31:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-14 19:39:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function replaceWords(dictionary: string[], sentence: string): string {
  // Think for yourself for 5 minutes..
  let words = sentence.split(' ')

  const dictSet = new Set()
  for (const val of dictionary) {
    dictSet.add(val)
  }

  for (const [i, word] of words.entries()) {
    let p = 0
    while (p < word.length && !dictSet.has(word.substring(0, p))) {
      p++
    }
    words[i] = word.substring(0, p)
  }

  return words.join(' ')
}

class Trie {
  tree: {
    isEnd?: boolean
  }
  constructor() {
    this.tree = {}
  }

  insert(word: string) {
    let node = this.tree
    for (const ch of word) {
      if (!node[ch]) {
        node[ch] = {}
      }
      node = node[ch]
    }
    node.isEnd = true
  }

  findRoot(word: string) {
    let root = ''
    let cur = this.tree
    for (let i = 0; i < word.length; i++) {
      const c = word[i]
      if (cur.isEnd) {
        return root
      }
      if (cur && !cur[c] && !cur.isEnd) {
        return word
      }
      root += c
      cur = cur[c]
    }
    return root
  }
}

function replaceWordsByTrie(dictionary: string[], sentence: string): string {
  const trie = new Trie()
  for (const word of dictionary) {
    trie.insert(word)
  }
  const words = sentence.split(' ')
  let s = ''
  for (let i = 0; i < words.length; i++) {
    // words[i] = trie.findRoot(words[i])
    s += (i === 0 ? '' : ' ') + trie.findRoot(words[i])
  }
  return s
}

export { replaceWords, replaceWordsByTrie }
