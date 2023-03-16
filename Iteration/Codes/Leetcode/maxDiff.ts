/*
 * Description: 1529：改变一个整数能得到的最大差值
 * Url: https://leetcode.cn/problems/max-difference-you-can-get-from-changing-an-integer/
 * Tags: 贪心  数学
 * Created: 2023-03-16 22:21:50
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 23:08:27
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maxDiff(num: number): number {
  // Think for yourself for 5 minutes...
  // q1. 一次可以换一个数 且数字中所有的这个数都可以被换掉⚠️
  // q2. 可以换两次，两次的差值要最大
  // q3. 第一次尽量往大换，第二次尽量往小换
  // q4. 只能选1=0-9的数字
  // q5. 对于第一次 尽量选最大位数的数字换成9  如果最大位数本来就是9 就换下一位
  // q6. 对于第二次，尽量换最大位数的数字换成0(除首位) 如果最大位数本来就是1 就换下一位
  //
  const nums: string[] = (num + '').split('')

  let firstNum: string[] = nums.slice()

  let secondNum: string[] = nums.slice()

  let flag1: boolean | string = false

  firstNum.forEach((val, index) => {
    // 标记需要被换掉数
    if (!flag1 && val != '9') flag1 = val
    if (flag1 && val === flag1) firstNum[index] = '9'
  })

  let flag2
  let c = 0

  if (secondNum[0] != '1') {
    // 首位不是1的情况，标记第一位这个数字，将后面的这个数字统统替换
    flag2 = secondNum[0]
    while (c < secondNum.length) {
      if (secondNum[c] == flag2) secondNum[c] = '1'
      c += 1
    }
  } else {
    // 找到第一个不为0或1的位置
    while (c < secondNum.length && (secondNum[c] === '1' || secondNum[c] === '0')) c += 1
    if (c < secondNum.length) {
      // 标记这个不为0的位置，将后面的这个数全都替换成0
      flag2 = secondNum[c]
      while (c < secondNum.length) {
        if (secondNum[c] == flag2) secondNum[c] = '0'
        c += 1
      }
    }
  }

  return +firstNum.join('') - +secondNum.join('')
}
export default maxDiff
