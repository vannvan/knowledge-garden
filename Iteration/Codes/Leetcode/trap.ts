/*
 * Description: 42：接雨水
 * Url: https://leetcode.cn/problems/trapping-rain-water/
 * Tags: 栈  数组  双指针  动态规划  单调栈
 * Created: 2023-03-19 18:32:17
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-19 22:01:48
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 暴力解
 * @param height
 * @returns
 */
function trap1(height: number[]): number {
  // Think for yourself for 5 minutes...

  let sum: number = 0

  for (let i = 0; i < height.length; i++) {
    // 第一个和最后一个不接雨水
    if (i === 0 || i === height.length - 1) continue

    let rHeight = height[i]
    let lHeight = height[i]

    for (let r = i + 1; r < height.length; r++) {
      if (height[r] > rHeight) {
        rHeight = height[r]
      }
    }

    for (let l = i - 1; l >= 0; l--) {
      if (height[l] > lHeight) {
        lHeight = height[l]
      }
    }

    let h = Math.min(lHeight, rHeight) - height[i]
    if (h > 0) sum += h
  }

  return sum
}

/**
 * 动态规划
 * @param height
 * @returns
 */
function trap2(height: number[]): number {
  const n: number = height.length
  if (n <= 2) return 0

  //记录每根柱子两边的最大高度
  const maxLeft: number[] = Array(n).fill(0)
  maxLeft[0] = height[0]

  for (let i = 1; i < height.length; i++) {
    maxLeft[i] = Math.max(height[i], maxLeft[i - 1])
  }

  const maxRight: number[] = Array(n).fill(0)
  maxRight[n - 1] = height[n - 1]

  for (let j = n - 2; j >= 0; j--) {
    maxRight[j] = Math.max(height[j], maxRight[j + 1])
  }

  let sum = 0

  for (let i = 0; i < n; i++) {
    let count = Math.min(maxLeft[i], maxRight[i]) - height[i]
    if (count > 0) sum += count
  }

  return sum
}

/**
 * 单调栈
 * @param height
 */
function trap(height: number[]): number {
  let sum: number = 0

  const stack: number[] = []
  stack[0] = 0
  for (let i = 1; i < height.length; i++) {
    // 栈不为空，且当前元素（右墙）比栈顶（右墙的左侧）大：说明形成凹槽了
    while (stack.length && height[i] > height[stack[stack.length - 1]]) {
      // 凹槽处弹出，尝试结算此低洼处能积攒的雨水
      const bottom = stack[stack.length - 1]
      stack.pop()

      let bottomHeight = height[bottom] // 凹槽处的高度
      let rightHeight = height[i] // 凹槽右边的高度
      let leftHeight = height[stack[stack.length - 1]] // 凹槽左边的高度

      if (stack.length) {
        // 能积攒的水=(右墙位置-左墙位置-1) * (min(右墙高度, 左墙高度)-凹槽处高度)
        let height = Math.min(rightHeight, leftHeight) - bottomHeight
        let width = i - stack[stack.length - 1] - 1 // 注意减一，只求中间宽度
        sum += height * width
      }
    }

    stack.push(i)
  }

  return sum
}

export default trap
