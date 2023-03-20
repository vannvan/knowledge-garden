/*
 * Description: 682：棒球比赛
 * Url: https://leetcode.cn/problems/baseball-game/
 * Tags: 栈  数组  模拟
 * Created: 2023-03-20 23:18:32
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-20 23:40:36
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function calPoints(operations: string[]): number {
  // Think for yourself for 5 minutes...
  // + 前两次总和 D 前一次得分的两倍 C 前一次无效 X 整数表示本次得分
  const stack: string[] = []
  const n: number = operations.length
  for (let i = 0; i < n; i++) {
    const cur = operations[i]
    if (/\d/.test(cur)) {
      stack.push(cur)
    }

    if ('D' === cur) {
      const pre = stack[stack.length - 1]
      stack.push('' + Number(pre) * 2)
    }

    if ('C' === cur) {
      stack.pop()
    }
    if ('+' === cur) {
      const pre1 = stack[stack.length - 1]
      const pre2 = stack[stack.length - 2]
      stack.push(String(Number(pre1) + Number(pre2)))
    }
  }

  return stack.length ? stack.map((el) => Number(el)).reduce((prev, curr) => prev + curr) : 0
}
export default calPoints
