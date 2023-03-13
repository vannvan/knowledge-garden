/*
 * Description: 383：赎金信
 * Url: https://leetcode.cn/problems/ransom-note/
 * Tags: 哈希表  字符串  计数
 * Created: 2023-03-13 20:57:46
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 21:05:46
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function canConstruct(ransomNote: string, magazine: string): boolean {
  // Think for yourself for 5 minutes...

  let n: number = ransomNote.length

  const hash: Map<string, number> = new Map()

  for (const s of magazine) {
    const a = hash.get(s) || 0
    hash.set(s, a + 1)
  }

  for (const s of ransomNote) {
    if (hash.has(s) && hash.get(s)) {
      const a = hash.get(s) || 0
      hash.set(s, a - 1)
      n--
    } else {
      return false
    }
  }

  return n == 0
}
export default canConstruct
