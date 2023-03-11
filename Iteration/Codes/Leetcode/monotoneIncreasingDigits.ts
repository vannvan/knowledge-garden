/*
 * Description: 738：单调递增的数字
 * Url: https://leetcode.cn/problems/monotone-increasing-digits/
 * Tags: 贪心  数学
 * Created: 2023-03-11 21:20:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 21:48:06
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function monotoneIncreasingDigits(n: number): number {
  // Think for yourself for 5 minutes...
  // q1. 返回小于或等于n的最大数字，那么考虑原数字不是单调递增的话，从最低位开始替换成9
  const numArr: number[] = String(n)
    .split('')
    .map((i) => parseInt(i))

  //flag用来标记赋值9从哪里开始
  let flag = numArr.length
  for (let i = numArr.length - 1; i >= 0; i--) {
    // 从i位置开始不满足单调递增了，记下来
    if (numArr[i] > numArr[i + 1]) {
      numArr[i] -= 1
      flag = i + 1
    }
  }
  for (let i = flag; i < numArr.length; i++) {
    numArr[i] = 9
  }

  return parseInt(numArr.join(''))
}
export default monotoneIncreasingDigits
