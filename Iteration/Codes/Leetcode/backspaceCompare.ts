/*
 * Description: 874：比较含退格的字符串
 * Url: https://leetcode.cn/problems/backspace-string-compare/
 * Tags: 栈  双指针  字符串  模拟
 * Created: 2023-03-21 20:39:55
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-21 20:48:12
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function backspaceCompare(s: string, t: string): boolean {
  // Think for yourself for 5 minutes...
  const stack1: string[] = []
  const stack2: string[] = []

  for (const s1 of s) {
    if (s1 === '#') {
      stack1.pop()
    } else {
      stack1.push(s1)
    }
  }

  for (const t1 of t) {
    if (t1 === '#') {
      stack2.pop()
    } else {
      stack2.push(t1)
    }
  }

  return stack1.join('') === stack2.join('')
}
export default backspaceCompare
