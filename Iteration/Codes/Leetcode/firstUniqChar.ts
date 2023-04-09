/*
 * Description: 387：字符串中的第一个唯一字符
 * Url: https://leetcode.cn/problems/first-unique-character-in-a-string/
 * Tags: 队列  哈希表  字符串  计数
 * Created: 2023-04-09 21:26:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-09 21:37:02
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function firstUniqChar1(s: string): number {
  // Think for yourself for 5 minutes...

  const hash = {}
  for (const s1 of s) {
    hash[s1] = (hash[s1] || 0) + 1
  }

  let char = undefined
  for (const key in hash) {
    if (hash[key] === 1 && !char) {
      char = key
      continue
    }
  }

  let index = -1
  while (s[index] != char) {
    index++
  }

  return index > -1 ? index : -1
}

function firstUniqChar(s: string): number {
  const hash = {}

  for (let i = 0; i < s.length; i++) {
    const cur = s[i]
    // 跳过重复值
    if (cur in hash) continue
    // 如果唯一的一定是想等的
    if (s.indexOf(cur) === s.lastIndexOf(cur)) return i
    hash[cur] = 1
  }

  return -1
}
export default firstUniqChar
