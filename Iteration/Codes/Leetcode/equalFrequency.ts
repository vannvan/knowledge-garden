/*
 * Description: 2532：删除字符使频率相同
 * Url: https://leetcode.cn/problems/remove-letter-to-equalize-frequency/
 * Tags: 哈希表  字符串  计数
 * Created: 2023-04-29 20:31:01
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-29 21:02:24
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function equalFrequency(word: string): boolean {
  // Think for yourself for 5 minutes...
  // q1. 删除一项，剩余的每个字母出现的频率相同

  const charCount = Array(26).fill(0)
  for (const c of word) {
    charCount[c.charCodeAt(0) - 'a'.charCodeAt(0)]++
  }

  for (let i = 0; i < 26; i++) {
    if (charCount[i] === 0) continue

    // 尝试将当前字母计数减1
    charCount[i]--

    let frequency = new Set()
    for (const f of charCount) {
      if (f > 0) {
        frequency.add(f)
      }
    }
    // 说明每个字母出现的频率相同
    if (frequency.size === 1) return true
    // 如果上面没有return，说明删除当前字符不行，就要还原
    charCount[i]++
  }

  return false
}
export default equalFrequency
