/*
 * Description: 1666：整理字符串
 * Url: https://leetcode.cn/problems/make-the-string-great/
 * Tags: 栈  字符串
 * Created: 2023-03-21 22:21:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-21 22:40:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function makeGood(s: string): string {
  // Think for yourself for 5 minutes...
  // q1.若 s[i] 是小写字符，则 s[i+1] 不可以是相同的大写字符。
  // 若 s[i] 是大写字符，则 s[i+1] 不可以是相同的小写字符。

  const stack: string[] = []

  for (const s1 of s) {
    const top = stack[stack.length - 1]
    if (stack.length && top && top != s1 && top.toUpperCase() === s1.toUpperCase()) {
      stack.pop()
    } else {
      stack.push(s1)
    }
  }

  return stack.join('')
}
export default makeGood
