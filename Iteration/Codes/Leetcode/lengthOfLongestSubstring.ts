/*
 * Description: 3：无重复字符的最长子串
 * Url: https://leetcode.cn/problems/longest-substring-without-repeating-characters/
 * Tags: 哈希表  字符串  滑动窗口
 * Created: 2023-06-04 21:19:11
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-06-04 21:41:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function lengthOfLongestSubstring(s: string): number {
  // Think for yourself for 5 minutes...
  let p = 0
  let arr = []
  let max = 0
  while (p < s.length) {
    let index = arr.indexOf(s[p])
    if (index != -1) {
      arr.splice(0, index + 1)
    }
    arr.push(s[p])
    max = Math.max(max, arr.length)
    p++
  }

  return max
}

function lengthOfLongestSubstring2(s: string): number {
  const hash = new Map()
  let left = 0
  let right = 0
  let max = 0

  while (right < s.length) {
    if (!hash.has(s[right])) {
      hash.set(s[right], true)
      right++
    } else {
      hash.delete(s[left])
      left++
    }

    max = Math.max(max, hash.size)
  }

  return max
}
export { lengthOfLongestSubstring, lengthOfLongestSubstring2 }
