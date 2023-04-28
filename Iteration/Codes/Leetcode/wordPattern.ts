/*
 * Description: 290：单词规律
 * Url: https://leetcode.cn/problems/word-pattern/
 * Tags: 哈希表  字符串
 * Created: 2023-04-28 21:12:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-28 21:36:04
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function wordPattern(pattern: string, s: string): boolean {
  // Think for yourself for 5 minutes...
  // q1. 位置和次数都相同,双重匹配

  const words = s.split(' ')
  if (words.length != pattern.length) return false

  const hash = new Map()

  const hash2 = new Map()

  for (const [i, word] of words.entries()) {
    const ch = pattern[i]

    if ((hash2.has(word) && hash2.get(word) != ch) || (hash.has(ch) && hash.get(ch) !== word)) {
      return false
    }

    hash2.set(word, ch)
    hash.set(ch, word)
  }

  return true
}
export default wordPattern
