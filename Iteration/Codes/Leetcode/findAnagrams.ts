/*
 * Description: 438：找到字符串中所有字母异位词
 * Url: https://leetcode.cn/problems/find-all-anagrams-in-a-string/
 * Tags: 哈希表  字符串  滑动窗口
 * Created: 2023-03-13 23:09:26
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 23:18:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function findAnagrams(s: string, p: string): number[] {
  // Think for yourself for 5 minutes...

  const need: Map<string, number> = new Map()

  const window: Map<string, number> = new Map()

  for (const t of p) {
    const a = need.get(t) || 0
    need.set(t, a + 1)
  }

  const res: number[] = []

  let left = 0
  let right = 0

  let count: number = 0

  while (right < s.length) {
    const c = s[right]
    right++
    if (need.has(c)) {
      if (window.has(c)) {
        window.set(c, (window.get(c) || 0) + 1)
      } else {
        window.set(c, 1)
      }

      if (need.get(c) === window.get(c)) {
        count++
      }
    }

    while (right - left >= p.length) {
      if (count === need.size) {
        res.push(left)
      }

      const c2 = s[left]
      left++
      if (need.has(c2)) {
        if (window.get(c2) === need.get(c2)) {
          count--
        }

        window.set(c2, (window.get(c2) || 0) - 1)
      }
    }
  }

  return res
}
export default findAnagrams
