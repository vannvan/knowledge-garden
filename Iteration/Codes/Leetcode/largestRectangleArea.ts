/*
 * Description: 84：柱状图中最大的矩形
 * Url: https://leetcode.cn/problems/largest-rectangle-in-histogram/
 * Tags: 栈  数组  单调栈
 * Created: 2023-03-19 22:04:31
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-19 22:14:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 单调递减栈
 * @param heights
 * @returns
 */
function largestRectangleArea(heights: number[]): number {
  // Think for yourself for 5 minutes...

  const stack: number[] = []

  heights.unshift(0)
  heights.push(0)

  let result: number = 0

  for (let i = 0; i < heights.length; i++) {
    while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
      const curr = stack[stack.length - 1]
      stack.pop()
      let left = stack[stack.length - 1] + 1
      let right = i - 1
      result = Math.max(result, (right - left + 1) * heights[curr])
    }

    stack.push(i)
  }

  return result
}
export default largestRectangleArea
