/*
 * Description: 886：括号的分数
 * Url: https://leetcode.cn/problems/score-of-parentheses/
 * Tags: 栈  字符串
 * Created: 2023-03-21 20:54:41
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-21 21:38:30
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function scoreOfParentheses(s: string): number {
  // Think for yourself for 5 minutes...

  const stack: number[] = [0]

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(0)
    } else {
      // 如果遇到右括号，说明A的分数被计算出来了，如果是0，说明当前元素的前一项是 左括号
      // 如果不是0 说明当前元素的前一项相隔了其他字符 2*v分
      const prev = stack.pop() as number
      let top = (stack.pop() as number) + Math.max(2 * prev, 1)
      stack.push(top)
    }
  }
  console.log('stack', stack)
  return stack[0]
}
export default scoreOfParentheses
