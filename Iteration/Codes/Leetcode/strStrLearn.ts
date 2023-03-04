/*
 * Description: 找出字符串中第一个匹配项的下标
 * Url: https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/
 * Tags: 双指针  字符串  字符串匹配
 * Created: 2023-03-04 15:32:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-04 15:48:20
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/ vannvan
 */

function strStrLearn(haystack: string, needle: string): number {
  // step1 先找到needle的next数组
  // step2 遍历haystack,移动j指针不断缩小needle子串范围
  if (needle.length == 0) return 0

  const getNext = (str: string): number[] => {
    let next: number[] = []
    next[0] = 0
    let j: number = 0
    for (let i = 1; i < str.length; i++) {
      while (j > 0 && str[i] !== str[j]) {
        j = next[j - 1]
      }

      if (str[i] === str[j]) {
        j++
      }
      next[i] = j
    }

    return next
  }

  console.log('next', getNext(needle))

  const next: number[] = getNext(needle)

  let j: number = 0 // 是needle上的指针，最大值是needle.length-1
  for (let i = 0; i < haystack.length; i++) {
    while (j > 0 && haystack[i] !== needle[j]) {
      j = next[j - 1]
    }

    if (haystack[i] === needle[j]) {
      if (j === needle.length - 1) {
        return i - j
      }
      j++
    }
  }

  return -1
}
export default strStrLearn
