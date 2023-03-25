/*
 * Description: 372：超级次方
 * Url: https://leetcode.cn/problems/super-pow/
 * Tags: 数学  分治
 * Created: 2023-03-25 17:01:14
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 17:31:11
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const pow = (a: number, k: number) => {
  const base = 1337
  // 对因子求模
  a %= base
  let res = 1
  for (let i = 0; i < k; i++) {
    // 这里有乘法，是潜在的溢出点
    res *= a
    // 对乘法结果求模
    res %= base
  }
  return res
}

function superPow(a: number, b: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 考虑如何快速通过数组b计算 次方
  // q2. 考虑如何取模不会溢出
  const base = 1337
  if (b.length === 0) return 1
  const last = b.pop()
  const part1 = pow(a, last)
  const part2 = pow(superPow(a, b), 10)
  // 每次乘法都要求模
  return (part1 * part2) % base
}
export default superPow
