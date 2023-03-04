/*
 * Description: 删除字符串中的所有相邻重复项
 * Url: https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/
 * Tags: 栈  字符串
 * Created: 2023-03-04 20:05:26
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-04 20:23:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function removeDuplicatesString(s: string): string {
  // TODO
  let stack: string[] = []
  let strArr: string[] = Array.from(s)

  let i = 0
  while (i < strArr.length) {
    let top = stack[stack.length - 1]
    if (strArr[i] == top) {
      stack.pop()
    } else {
      stack.push(strArr[i])
    }
    i++
  }
  console.log('stack', stack)

  return stack.join('')
}
export default removeDuplicatesString
