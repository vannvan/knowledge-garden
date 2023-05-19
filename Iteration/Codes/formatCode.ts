/*
 * Description: 用来转换代码格式
 * Created: 2023-03-31 21:25:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-16 10:05:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b)
  let n = nums.length
  let left: number = 0
  let right: number = length - 1
  const ans: number[][] = []

  for (let i = 0; i < n; i++) {
    //nums经过排序后，只要nums[i]>0, 此后的nums[i] + nums[left] + nums[right]均大于0,可以提前终止循环。
    if (nums[i] > 0) continue

    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }

    left = i + 1
    right = length - 1
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
