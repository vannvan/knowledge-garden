/*
 * Description: 重复的子字符串
 * Url: https://leetcode.cn/problems/repeated-substring-pattern/
 * Tags: 字符串  字符串匹配
 * Created: 2023-03-04 15:51:09
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-04 16:39:05
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function repeatedSubstringPattern(s: string): boolean {
  // step1 先获取到前缀表
  // step2 经分析当满足s是有多个重复的子字符串构成的话，其满足 s长度 % (s长度 - next[最后一位]) === 0
  const getNext = (str: string): number[] => {
    let next: number[] = []
    let j: number = 0
    next[0] = 0
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

  const next = getNext(s)

  const n = s.length

  // console.log('next', getNext(s))
  if (next[n - 1] != 0 && n % (n - next[n - 1]) === 0) return true
  return false
}
export default repeatedSubstringPattern
