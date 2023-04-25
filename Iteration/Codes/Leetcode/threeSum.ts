/*
 * Description: 15：三数之和
 * Url: https://leetcode.cn/problems/3sum/
 * Tags: 数组  双指针  排序
 * Created: 2023-03-13 21:08:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-25 18:36:38
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b)
  const n = nums.length
  let left: number = 0
  let right: number = n - 1
  const ans: number[][] = []

  for (let i = 0; i < n; i++) {
    // 1. nums经过排序后，只要nums[i]>0, 此后的nums[i] + nums[left] + nums[right]均大于0,可以提前终止循环。
    if (nums[i] > 0) continue

    // 2. 去重
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }

    left = i + 1
    right = n - 1
    while (left < right) {
      let total: number = nums[i] + nums[left] + nums[right]
      // 当找到一组匹配的之后，[left,right]区间缩小
      if (total === 0) {
        ans.push([nums[i], nums[left], nums[right]])
        left++
        right--
        // 当left左侧和left的值相等时，不会对结果有贡献
        while (nums[left] === nums[left - 1]) {
          left++
        }
        // 当right右侧的heleft的值相等时，不会对结果有贡献
        while (nums[right] === nums[right + 1]) {
          right--
        }
      } else if (total > 0) {
        right--
      } else {
        left++
      }
    }
  }

  return ans
}
export default threeSum
