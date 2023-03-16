/*
 * Description: 1448：6 和 9 组成的最大数字
 * Url: https://leetcode.cn/problems/maximum-69-number/
 * Tags: 贪心  数学
 * Created: 2023-03-16 19:51:05
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 20:03:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maximum69Number(num: number): number {
  // Think for yourself for 5 minutes...
  // q1. 只能改变一位数字
  // 从最大位开始不是6就给变成9

  let arr: number[] = String(num)
    .split('')
    .map((el) => Number(el))
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != 9) {
      arr[i] = 9
      return Number(arr.join(''))
    } else {
      continue
    }
  }
  return num
}
export default maximum69Number
