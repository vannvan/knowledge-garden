/*
 * Description: 13：罗马数字转整数
 * Url: https://leetcode.cn/problems/roman-to-integer/
 * Tags: 哈希表  数学  字符串
 * Created: 2023-03-28 23:24:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-28 23:38:22
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function romanToInt(s: string): number {
  // Think for yourself for 5 minutes...

  const symbolValues = new Map()
  symbolValues.set('I', 1)
  symbolValues.set('V', 5)
  symbolValues.set('X', 10)
  symbolValues.set('L', 50)
  symbolValues.set('C', 100)
  symbolValues.set('D', 500)
  symbolValues.set('M', 1000)

  let ans = 0
  const n = s.length
  for (let i = 0; i < n; ++i) {
    // XIX可以视作X-I+V = 10 - 1 + 5 = 14
    // 因此 若存在小的数字在大的数字左边的情况，需要减去小的数字
    const value = symbolValues.get(s[i])
    if (i < n - 1 && value < symbolValues.get(s[i + 1])) {
      ans -= value
    } else {
      ans += value
    }
  }
  return ans
}
export default romanToInt
