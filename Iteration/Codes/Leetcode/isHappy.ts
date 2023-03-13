/*
 * Description: 202：快乐数
 * Url: https://leetcode.cn/problems/happy-number/
 * Tags: 哈希表  数学  双指针
 * Created: 2023-03-13 20:19:53
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 20:40:19
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function isHappy(n: number): boolean {
  // Think for yourself for 5 minutes...

  // q1. 考虑数字拆成各位数之后逐渐拆分一定后面一定不会重复，重复就代表无限循环就不是快乐数了
  let m = new Map()

  const getSum = (num: number) => {
    let sum = 0
    while (n) {
      sum += (n % 10) ** 2
      n = Math.floor(n / 10)
    }
    return sum
  }

  while (true) {
    // n出现过，证明已陷入无限循环
    if (m.has(n)) return false
    if (n === 1) return true
    m.set(n, 1)
    n = getSum(n)
  }
}
export default isHappy
