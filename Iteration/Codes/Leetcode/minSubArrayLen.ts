/*
 * Description: 209：长度最小的子数组
 * Url: https://leetcode.cn/problems/minimum-size-subarray-sum/
 * Tags: 数组  二分查找  前缀和  滑动窗口
 * Created: 2023-04-24 22:00:28
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-24 22:19:25
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function minSubArrayLen(target: number, nums: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 长度最小

  let left = 0
  let right = 0
  let inc = target
  let ans = 0
  while (right < nums.length) {
    inc -= nums[right]
    right++
    // 找到了一个子集
    while (inc <= 0) {
      let len = right - left
      if (!ans || len < ans) ans = len
      inc += nums[left]
      left++
    }
  }

  return ans
}
export default minSubArrayLen
