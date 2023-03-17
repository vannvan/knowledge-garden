/*
 * Description: 7：整数反转
 * Url: https://leetcode.cn/problems/reverse-integer/
 * Tags: 数学
 * Created: 2023-03-17 21:19:15
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-17 21:39:41
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function reverse(x: number): number {
  // Think for yourself for 5 minutes...
  // q1. 考虑保留原数字的符号
  // q2. 考虑去除反转后的前导0
  // q2. 考虑反转后需要在 Math.pow(-2,31) ~ Math.pow(2,31)-1 之内 如果超出范围就返回0
  //

  const x1: string[] = String(Math.abs(x)).split('')

  let res = x < 0 ? '-' : '' // 如果小于0先初始化负号

  let left = 0
  let right = x1.length - 1
  while (left < right) {
    let temp = x1[left]
    x1[left] = x1[right]
    x1[right] = temp
    left++
    right--
  }

  // 对于前面有0的处理
  if (x1.join('').indexOf('0') > -1) {
    let i = 0
    while (true && x1[i] === '0') x1[i] === '0' && i++
    res += x1.join('').slice(i)
  } else {
    res += x1.join('')
  }

  if (+res >= Math.pow(-2, 31) && +res <= Math.pow(2, 31) - 1) {
    return +res
  } else {
    return 0
  }
}
export default reverse
