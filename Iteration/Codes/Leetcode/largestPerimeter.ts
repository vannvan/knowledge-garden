/*
 * Description: 1018：三角形的最大周长
 * Url: https://leetcode.cn/problems/largest-perimeter-triangle/
 * Tags: 贪心  数组  数学  排序
 * Created: 2023-03-12 17:17:56
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 17:23:58
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function largestPerimeter(nums: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 考虑三条边需要满足能够构成三角形
  // q2. 要最大周长，先给排个序
  nums.sort((a, b) => b - a)

  let max: number = 0

  const isValid = (a: number, b: number, c: number) => {
    if (
      a + b > c &&
      a + c > b &&
      b + c > a &&
      Math.abs(a - b) < c &&
      Math.abs(a - c) < b &&
      Math.abs(b - c) < a
    ) {
      return true
    }
    return false
  }

  for (let i = 0; i < nums.length; i++) {
    if (isValid(nums[i], nums[i + 1], nums[i + 2])) {
      max = Math.max(max, nums[i] + nums[i + 1] + nums[i + 2])
    }
  }

  return max
}
export default largestPerimeter
