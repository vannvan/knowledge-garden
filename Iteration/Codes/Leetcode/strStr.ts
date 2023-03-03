/*
 * Description: 找出字符串中第一个匹配项的下标
 * Url: https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/
 * Tags: 双指针  字符串  字符串匹配
 * Created: 2023-03-03 18:58:54
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 22:25:00
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
/**
 * 前缀表减一的版本
 * @param haystack
 * @param needle
 * @returns
 */
function strStr(haystack: string, needle: string): number {
  // TODO
  if (needle.length === 0) return 0

  const getNext = (str: string): number[] => {
    let next: number[] = []
    let j: number = -1
    next[0] = j
    // i是线性的增加的，j是前后游走的
    for (let i = 1; i < str.length; i++) {
      // 当前后缀不相同时，j就向前回退，直到找到前后缀字符相同，找不到j就是-1，while循环结束
      while (j >= 0 && str[i] !== str[j + 1]) {
        j = next[j] // 向前回退
      }
      if (str[i] === str[j + 1]) {
        // 找到相同的后缀
        j++
      }
      next[i] = j
    }
    return next
  }

  console.log('next', getNext(needle))

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

// 不减一版本
function strStr2(haystack: string, needle: string): number {
  function getNext(str: string): number[] {
    let next: number[] = []
    let j: number = 0
    next[0] = j
    for (let i = 1, length = str.length; i < length; i++) {
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
  if (needle.length === 0) return 0
  let next: number[] = getNext(needle)
  let j: number = 0
  for (let i = 0, length = haystack.length; i < length; i++) {
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
export default strStr
