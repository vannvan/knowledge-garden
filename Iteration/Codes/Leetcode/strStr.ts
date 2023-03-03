/*
 * Description: 找出字符串中第一个匹配项的下标
 * Url: https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/
 * Tags: 双指针  字符串  字符串匹配
 * Created: 2023-03-03 18:58:54
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 21:03:18
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function strStr(haystack: string, needle: string): number {
  // TODO
  if (needle.length === 0) return 0

  const getNext = (str: string): number[] => {
    let next: number[] = []
    let j: number = -1
    next[0] = j
    for (let i = 1, length = str.length; i < length; i++) {
      while (j >= 0 && str[i] !== str[j + 1]) {
        j = next[j]
      }
      if (str[i] === str[j + 1]) {
        j++
      }
      next[i] = j
    }
    return next
  }

  let next: number[] = getNext(needle)
  console.log('next', next)

  let j: number = -1
  const n = haystack.length
  for (let i = 0; i < n; i++) {
    while (j > 0 && haystack[i] != needle[j + 1]) {
      j = next[j]
    }

    if (haystack[i] === needle[j + 1]) {
      if (j === needle.length - 2) {
        return i - j - 1
      }
      j++
    }
  }

  return -1
}
export default strStr
