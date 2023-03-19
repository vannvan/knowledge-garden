/*
 * Description: 84：柱状图中最大的矩形
 * Url: https://leetcode.cn/problems/largest-rectangle-in-histogram/
 * Tags: 栈  数组  单调栈
 * Created: 2023-03-19 22:04:31
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-19 22:28:27
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 暴力解法
 * @param heights
 */
function largestRectangleArea1(heights: number[]): number {
  // 对于每一个元素，我们去求它可以向两边延伸，找到能够构成矩形的左右两端点
  // 能有构成矩形的条件时这个点是>=当前点的
  let n: number = heights.length
  if (n == 0) return 0
  let result: number = 0

  for (let i = 0; i < n; i++) {
    let left = i
    let currHeight = heights[i]

    // 找当前元素左边最后 1 个大于等于 heights[i] 的下标
    while (left > 0 && heights[left - 1] >= currHeight) {
      left--
    }

    // 找当前元素右边最后 1 个大于等于 heights[i] 的下标
    let right = i
    while (right < n - 1 && heights[right + 1] >= currHeight) {
      right++
    }

    let width = right - left + 1
    result = Math.max(result, width * currHeight)
  }

  return result
}

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
