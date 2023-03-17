/*
 * Description: 283：移动零
 * Url: https://leetcode.cn/problems/move-zeroes/
 * Tags: 数组  双指针
 * Created: 2023-03-17 21:01:11
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-17 21:10:04
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
  // Think for yourself for 5 minutes...

  let fast = 0
  let slow = 0

  while (fast < nums.length) {
    if (nums[fast]) {
      let t = nums[slow]
      nums[slow] = nums[fast]
      nums[fast] = t
      slow++
    }
    fast++
  }

  console.log('nums', nums)
}
export default moveZeroes
