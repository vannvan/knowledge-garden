/*
 * Description: 150：逆波兰表达式求值
 * Url: https://leetcode.cn/problems/evaluate-reverse-polish-notation/
 * Tags: 栈  数组  数学
 * Created: 2023-03-25 21:03:10
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 21:27:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function evalRPN(tokens: string[]): number {
  // Think for yourself for 5 minutes...

  const stack: number[] = []

  for (const val of tokens) {
    if (isNaN(Number(val))) {
      // 非数字
      // 先出栈的是右操作数，后出栈的是左操作数
      const num2 = stack.pop()
      const num1 = stack.pop()
      switch (val) {
        case '+':
          stack.push(num1 + num2)
          break
        case '-':
          stack.push(num1 - num2)
          break
        case '*':
          stack.push(num1 * num2)
          break
        case '/':
          stack.push((num1 / num2) | 0)
          break
      }
    } else {
      stack.push(Number(val))
    }
  }

  return stack.pop()
}

export default evalRPN
