/*
 * Description: 739：每日温度
 * Url: https://leetcode.cn/problems/daily-temperatures/
 * Tags: 栈  数组  单调栈
 * Created: 2023-03-19 14:46:10
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-19 17:36:34
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function dailyTemperatures1(temperatures: number[]): number[] {
  // Think for yourself for 5 minutes...
  // [73, 74, 75, 71, 69, 72, 76, 73]
  // q1. 下一个高温在几天之后 即i之后的相对于i升温
  // 如果i+1 > i 那么 i位置的就是1
  // 如果i+n > i 那么 i位置就是n
  // 因为第一项前面没有元素，先把第一项推入栈中
  // 栈顶(数组的尾部)只push “较大”的元素的索引，(从栈顶到栈底依次递减)
  // 当下次遇到当前元素小于栈顶元素时，说明i位置以前的差值都需要更新了
  // 直到把栈掏空为止，最后再将当前元素入栈，开始下一轮出入栈操作

  const stack: number[] = [] // 用于存储元素右面第一个比他大的元素下标
  const n: number = temperatures.length

  const result: number[] = Array(n).fill(0)

  const T: number[] = temperatures

  stack.push(0)

  for (let i = 1; i < n; i++) {
    const top = stack[stack.length - 1]
    if (T[i] <= T[top]) {
      stack.push(i)
    } else {
      while (stack.length && T[i] > T[stack[stack.length - 1]]) {
        const top = stack.pop()
        if (top != undefined) {
          result[top] = i - top
        }
      }
      stack.push(i)
    }
  }
  return result
}

function dailyTemperatures(temperatures: number[]): number[] {
  const n: number = temperatures.length
  const T: number[] = temperatures

  const stack: number[] = []

  const result: number[] = Array(n).fill(0)

  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && T[stack[stack.length - 1]] <= T[i]) {
      stack.pop()
    }
    result[i] = !stack.length ? 0 : stack[stack.length - 1] - i
    stack.push(i)
  }

  return result
}
export default dailyTemperatures
