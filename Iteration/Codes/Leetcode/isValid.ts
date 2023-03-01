/*
 * Description: 有效的括号
 * Url: https://leetcode.cn/problems/valid-parentheses/
 * Created: 2023-03-01 22:56:39
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-01 23:39:29
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function isValid(s: string): boolean {
  if (s.length % 2 != 0) return false
  const map = new Map()
  map.set('}', '{')
  map.set(')', '(')
  map.set(']', '[')
  let arr: string[] = s.split('')
  let stack: string[] = []
  while (arr.length) {
    const cur: string = arr.shift() as string
    if (['}', ')', ']'].includes(cur)) {
      const top = stack.pop()
      if (map.get(cur) != top) {
        return false
      }
    } else {
      stack.push(cur)
    }
  }
  return stack.length == 0
}
export default isValid
