/*
 * Description: 153：寻找旋转排序数组中的最小值
 * Url: https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/
 * Tags: 数组  二分查找
 * Created: 2023-04-25 23:50:17
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-29 22:34:34
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function findMin(nums: number[]): number {
  // Think for yourself for 5 minutes...

  let left = 0
  let right = nums.length - 1
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2)
    // if (nums[mid] < nums[right]) {
    //   // if(min>=nums[left])
    //   right = mid
    // } else {
    //   left = mid + 1
    // }
    if (nums[mid] > nums[right]) {
      left = mid + 1
    } else {
      right = mid
    }
  }

  return nums[left]
}
export default findMin
