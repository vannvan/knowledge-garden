/*
 * Description: 242：有效的字母异位词
 * Url: https://leetcode.cn/problems/valid-anagram/
 * Tags: 哈希表  字符串  排序
 * Created: 2023-03-13 20:00:33
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 20:07:59
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function isAnagram(s: string, t: string): boolean {
  // Think for yourself for 5 minutes...
  if (s.length != t.length) return false

  const hash: Map<string, number> = new Map()

  for (const c of s) {
    const a = hash.get(c) || 0
    hash.set(c, a + 1)
  }

  for (const d of t) {
    if (hash.has(d) && hash.get(d)) {
      const a: number = hash.get(d) as any
      hash.set(d, a - 1)
    } else {
      return false
    }
  }

  return true
}
export default isAnagram
