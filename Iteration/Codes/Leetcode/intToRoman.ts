/*
 * Description: 12：整数转罗马数字
 * Url: https://leetcode.cn/problems/integer-to-roman/
 * Tags: 哈希表  数学  字符串
 * Created: 2023-03-12 13:32:10
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 14:25:53
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000

function intToRoman(num: number): string {
  // Think for yourself for 5 minutes...

  // 21 XXI 22 XXII

  const hash: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]

  // q1. 先根据最大位取值
  // q2. 从左到右的每一位，需要选尽可能大的符号
  // q3. 要生成 1 4 5 9的自负字符组合

  const roman: string[] = []

  for (const [value, symbol] of hash) {
    while (num >= value) {
      num -= value
      roman.push(symbol)
    }
    if (num === 0) break
  }

  return roman.join('')
}

export default intToRoman
