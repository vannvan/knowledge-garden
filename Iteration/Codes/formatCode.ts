/*
 * Description: 用来转换代码格式
 * Created: 2023-03-31 21:25:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-21 23:06:31
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
function removeDuplicates(s: string): string {
  let stack = []
  let p = 0
  while (p < s.length) {
    // 栈顶是和当前元素相邻的元素
    let top = stack[stack.length - 1]
    // 如果相等就干掉
    if (s[p] === top) {
      stack.pop()
    } else {
      stack.push(s[p])
    }
    p++
  }
  return stack.join('')
}
