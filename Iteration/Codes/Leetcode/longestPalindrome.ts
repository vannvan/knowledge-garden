/*
 * Description: 409：最长回文串
 * Url: https://leetcode.cn/problems/longest-palindrome/
 * Tags: 贪心  哈希表  字符串
 * Created: 2023-03-11 22:05:24
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 22:21:14
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function longestPalindrome(s: string): number {
  // Think for yourself for 5 minutes...
  if (s.length == 0) return 0
  // if (s.length == 1) return 1

  const hash = new Map()

  // 记录每个字符出现的次数
  for (let i = 0; i < s.length; i++) {
    let a = hash.get(s[i]) || 0
    hash.set(s[i], a + 1)
  }

  let count = 0

  let mark = 0 // 用来标记某个字母出现了奇数次情况
  for (let item of hash) {
    if (item[1] % 2 == 0) {
      count += item[1]
    } else {
      // 如果出现了奇数次，那也只能用n-1次
      count += item[1] > 1 ? item[1] - 1 : 0
      mark++
    }
  }
  // 如果出现了多个只出现奇数次的字符，对于回文而言只能用一个
  return mark ? count + 1 : count
}
export default longestPalindrome
