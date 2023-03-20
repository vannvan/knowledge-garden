/*
 * Description: 1570：商品折扣后的最终价格
 * Url: https://leetcode.cn/problems/final-prices-with-a-special-discount-in-a-shop/
 * Tags: 栈  数组  单调栈
 * Created: 2023-03-20 22:34:13
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-20 23:04:59
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function finalPrices1(prices: number[]): number[] {
  // Think for yourself for 5 minutes...
  // q1. 下一个更小的数,返回相减之后到值
  // q2. 以当前i位置为基准，找到第一个比他小的数

  const n: number = prices.length

  const ans: number[] = []
  for (let i = 0; i < n; i++) {
    let p: number = i + 1
    while (p < n && prices[p] > prices[i]) p++
    // 找到p的位置后，如果p到结尾了，说明没找到,就是当前值
    if (p == n) {
      ans[i] = prices[i]
    } else {
      const a = prices[i] - prices[p]
      ans[i] = a
    }
  }
  return ans
}

function finalPrices(prices: number[]): number[] {
  const n: number = prices.length

  const stack: number[] = []

  const ans: number[] = []

  for (let i = n - 1; i >= 0; i--) {
    // 当栈顶的元素比新来的大，说明新来的是之前的价格的相对小的值了
    // 就把栈顶的元素弹出
    while (stack.length && stack[stack.length - 1] > prices[i]) {
      stack.pop()
    }
    ans[i] = stack.length == 0 ? prices[i] : prices[i] - stack[stack.length - 1]
    stack.push(prices[i])
  }
  return ans
}

export default finalPrices
