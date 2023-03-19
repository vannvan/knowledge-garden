/*
 * Description: 503：下一个更大元素 II
 * Url: https://leetcode.cn/problems/next-greater-element-ii/
 * Tags: 栈  数组  单调栈
 * Created: 2023-03-19 17:43:02
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-19 18:23:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function nextGreaterElementsIi(nums: number[]): number[] {
  // Think for yourself for 5 minutes...
  const n: number = nums.length

  const result: number[] = Array(n).fill(0)

  const stack: number[] = []

  // 数组长度加倍模拟环形数组
  for (let i = 2 * n - 1; i >= 0; i--) {
    while (stack.length && stack[stack.length - 1] <= nums[i % n]) {
      stack.pop()
    }

    result[i % n] = stack.length === 0 ? -1 : stack[stack.length - 1]
    stack.push(nums[i % n])
  }

  return result
}
export default nextGreaterElementsIi
