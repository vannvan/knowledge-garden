/*
 * Description: 316：去除重复字母
 * Url: https://leetcode.cn/problems/remove-duplicate-letters/
 * Tags: 栈  贪心  字符串  单调栈
 * Created: 2023-03-21 22:57:51
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-21 23:31:22
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function removeDuplicateLetters(s: string): string {
  // Think for yourself for 5 minutes...
  // q1. 要去重
  // q2. 不能打乱相对顺序
  // q3. 字典序最小

  const count = {}
  for (let i = 0; i < s.length; i++) {
    count[s[i]] = count[s[i]] ? count[s[i]] + 1 : 1
  }

  const inStack = {}

  const stack: string[] = []

  for (const c of s) {
    count[c]--
    // 当栈里面有当前这个字符，就绕过
    if (inStack[c]) continue
    // console.log('此时栈里的元素为:', stack)
    while (stack.length && stack[stack.length - 1] > c) {
      // 若之后不存在栈顶元素了，则停止 pop,因为这时候count对应的这个字符都用完了,栈里面不存在重复元素
      if (count[stack[stack.length - 1]] == 0) {
        // console.log('剩下的元素:', stack)
        break
      }
      // console.log('此时将要弹出的元素:', stack[stack.length - 1])
      inStack[stack.pop() as any] = false // 出栈了打上标记
    }
    // 若之后不存在栈顶元素了，则停止 pop);
    stack.push(c)
    inStack[c] = true // 入栈了打上标记
  }

  // console.log('stack', stack)

  return stack.join('')
}
export default removeDuplicateLetters
