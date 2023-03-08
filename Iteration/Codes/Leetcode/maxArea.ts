/*
 * Description: 11：盛最多水的容器
 * Url: https://leetcode.cn/problems/container-with-most-water/
 * Tags: 贪心  数组  双指针
 * Created: 2023-03-08 22:10:57
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 22:30:13
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maxArea(height: number[]): number {
  // Think for yourself for 5 minutes...

  let max: number = 0
  let left = 0
  let right = height.length - 1

  while (left < right) {
    // 取比较低的那个
    let area = Math.min(height[left], height[right]) * (right - left)
    max = Math.max(area, max)

    if (height[left] <= height[right]) {
      left++
    } else {
      right--
    }
  }

  return max
}
export default maxArea
