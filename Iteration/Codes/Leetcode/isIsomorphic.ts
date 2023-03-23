/*
 * Description: 205：同构字符串
 * Url: https://leetcode.cn/problems/isomorphic-strings/
 * Tags: 哈希表  字符串
 * Created: 2023-03-23 21:23:07
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-23 21:47:27
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// 不对

function isIsomorphic1(s: string, t: string): boolean {
  // Think for yourself for 5 minutes...
  // q1. 对每个字符计数

  const n: number = s.length

  const hash1 = {}
  const hash2 = {}

  for (const s1 of s) {
    hash1[s1] = (hash1[s1] || 0) + 1
  }

  for (const t1 of t) {
    hash2[t1] = (hash2[t1] || 0) + 1
  }

  for (let i = 0; i < n; i++) {
    if (hash1[s[i]] != hash2[t[i]]) return false
    hash1[s[i]]--
    hash2[t[i]]--
  }

  return true
}

function isIsomorphic(s: string, t: string): boolean {
  // 对应字符串s、t的保存map
  let S = new Map()
  let T = new Map()
  for (let i = 0; i < s.length; i++) {
    // 当s、t出现了重复字符的话
    if (S.has(s[i]) || T.has(t[i])) {
      // 如果对于s和t在同一位置的字符，上一次出现的index不想等 就false
      if (S.get(s[i]) !== T.get(t[i])) return false
    }
    // 保存下当前位的字符和index
    S.set(s[i], i)
    T.set(t[i], i)
  }
  return true
}
export default isIsomorphic
