/*
 * Description: 224：基本计算器
 * Url: https://leetcode.cn/problems/basic-calculator/
 * Tags: 栈  递归  数学  字符串
 * Created: 2023-05-01 21:40:01
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-01 22:42:42
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function calculate(s: string): number {
  // Think for yourself for 5 minutes...
  // q1. 注意只有加减法
  // q2. 存在干扰计算的空白字符

  const stack = [1]
  const n = s.length

  let sign = 1
  let ans = 0
  let i = 0
  while (i < n) {
    if (s[i] === ' ') {
      i++
    } else if (s[i] === '+') {
      sign = stack[stack.length - 1]
      i++
    } else if (s[i] === '-') {
      sign = -stack[stack.length - 1]
      i++
    } else if (s[i] === '(') {
      stack.push(sign)
      i++
    } else if (s[i] === ')') {
      stack.pop()
      i++
    } else {
      // 开始计算
      let num = 0
      console.log(`当前i-> ${i}，当前sign-> ${sign}`)
      while (i < n && !isNaN(Number(s[i])) && s[i] !== ' ') {
        console.log(`${s[i]}参与计算`)
        num = num * 10 + s[i].charCodeAt(0) - '0'.charCodeAt(0)
        i++
      }
      ans += sign * num
    }
  }
  return ans
}
export default calculate
