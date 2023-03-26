/*
 * Description: 16：最接近的三数之和
 * Url: https://leetcode.cn/problems/3sum-closest/
 * Tags: 数组  双指针  排序
 * Created: 2023-03-26 18:42:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-26 19:05:08
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function threeSumClosest(nums: number[], target: number): number {
  // Think for yourself for 5 minutes...
  nums.sort((a, b) => a - b)

  const n = nums.length

  let ans: number = nums[0] + nums[1] + nums[2]

  for (let i = 0; i < n; i++) {
    let left = i + 1
    let right = n - 1
    while (left < right) {
      const a = nums[left] + nums[right] + nums[i]
      if (Math.abs(target - a) < Math.abs(target - ans)) {
        ans = a
      }
      if (a > target) right-- // 向左收缩
      else if (a < target) left++ // 向右收缩
      else return ans
    }
  }
  return ans
}
export default threeSumClosest
