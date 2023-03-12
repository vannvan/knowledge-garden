/*
 * Description: 402：移掉 K 位数字
 * Url: https://leetcode.cn/problems/remove-k-digits/
 * Tags: 栈  贪心  字符串  单调栈
 * Created: 2023-03-12 14:57:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 16:01:08
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function removeKdigits(num: string, k: number): string {
  // Think for yourself for 5 minutes...
  // q1. 剩余为空返回“0”
  // q2.使得剩下的数字最小
  const stk: string[] = []
  const n: number = num.length

  for (const digit of num) {
    // q1. 如果栈顶堆元素大于新来的元素就不断去除栈顶堆元素，
    while (stk.length > 0 && stk[stk.length - 1] > digit && k) {
      stk.pop()
      k -= 1
    }
    stk.push(digit)
  }

  console.log('stk', stk)
  // q2.如果删除了m个数字，且m<k,这种情况需要从序列尾部删除k-m个数字
  // removeKdigits('12345264', 5) 会走到这里
  for (; k > 0; --k) {
    stk.pop()
  }

  console.log('stk', stk)

  let ans: string = ''

  let isLeadingZero: boolean = true

  for (const val of stk) {
    // 遇到0就跳过
    if (isLeadingZero && val === '0') {
      continue
    }
    isLeadingZero = false
    ans += val
  }
  // 开头有0也可以这样处理
  // return parseInt(stk.join('')) == 0 || stk.length == 0 ? '0' : String(parseInt(stk.join('')))

  return ans === '' ? '0' : ans
}
export default removeKdigits
