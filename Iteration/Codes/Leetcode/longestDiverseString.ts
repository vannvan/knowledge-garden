/*
 * Description: 1304：最长快乐字符串
 * Url: https://leetcode.cn/problems/longest-happy-string/
 * Tags: 贪心  字符串  堆（优先队列）
 * Created: 2023-03-16 21:50:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 22:18:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function longestDiverseString(a: number, b: number, c: number): string {
  // Think for yourself for 5 minutes...
  // q1. a b c 不能连续出现三次
  // q2. 要尽可能长
  // q3. 优先使用最多的字符串 两个两个放 中间间隔较少的字符  直到所有较少的字符用完为止
  //
  const arr: any[] = [
    [a, 'a'],
    [b, 'b'],
    [c, 'c'],
  ]

  const res: string[] = []

  while (true) {
    // arr 的剩余数量会变化，因此在这里排序
    arr.sort((a, b) => b[0] - a[0])
    let hasNext = false
    for (const [i, [c, ch]] of arr.entries()) {
      if (c <= 0) {
        break
      }

      const m = res.length
      // 如果当前字母将要使res出现连续三个字母就跳过
      if (m >= 2 && res[m - 2] === ch && res[m - 1] === ch) {
        continue
      }

      hasNext = true
      res.push(ch)
      arr[i][0]--
      break // 每一轮放完当前数都要break 同一个字母肯定不能重新放
    }
    if (!hasNext) {
      break
    }
  }

  return res.join('')
}
export default longestDiverseString
