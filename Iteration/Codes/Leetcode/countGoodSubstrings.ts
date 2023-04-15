/*
 * Description: 1987：长度为三且各字符不同的子字符串
 * Url: https://leetcode.cn/problems/substrings-of-size-three-with-distinct-characters/
 * Tags: 哈希表  字符串  计数  滑动窗口
 * Created: 2023-04-15 16:35:24
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-15 16:51:08
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 计数
 * @param s
 * @returns
 */
function countGoodSubstrings1(s: string): number {
  // Think for yourself for 5 minutes...

  const arr = []
  for (let i = 0; i < s.length - 2; i++) {
    arr.push(s.substring(i, i + 3))
  }

  let set = new Set()

  let count = 0

  for (let i = 0; i < arr.length; i++) {
    let char = arr[i]
    for (const c of char) {
      set.add(c)
    }
    if (set.size == arr[i].length) {
      count++
    }
    set.clear()
  }

  return count
}

/**
 * 优化
 * @param s
 */
function countGoodSubstrings2(s: string): number {
  let count = 0
  for (let i = 0; i < s.length; i++) {
    const curr = s.slice(i, i + 3)
    if (new Set(curr.split('')).size === 3) {
      count++
    }
  }

  return count
}

/***
 * 时间复杂度O(n) 空间O(1)
 */
function countGoodSubstrings(s: string): number {
  let count = 0
  for (let i = 0; i < s.length - 2; i++) {
    if (s[i] !== s[i + 1] && s[i] !== s[i + 2] && s[i + 1] !== s[i + 2]) {
      count++
    }
  }

  return count
}

export default countGoodSubstrings
