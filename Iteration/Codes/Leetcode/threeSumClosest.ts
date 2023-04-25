/*
 * Description: 16：最接近的三数之和
 * Url: https://leetcode.cn/problems/3sum-closest/
 * Tags: 数组  双指针  排序
 * Created: 2023-03-26 18:42:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-25 18:40:44
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
      const sum = nums[i] + nums[left] + nums[right]
      if (Math.abs(target - sum) < Math.abs(target - ans)) {
        ans = sum
      }
      if (sum > target) {
        right-- // 向左逼近
      } else if (sum < target) {
        left++ // 向右逼近
      } else return ans
    }
  }
  return ans
}
export default threeSumClosest
