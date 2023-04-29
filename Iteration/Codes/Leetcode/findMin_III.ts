/*
 * Description: 154：寻找旋转排序数组中的最小值 II
 * Url: https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/
 * Tags: 数组  二分查找
 * Created: 2023-04-29 21:29:47
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-29 22:44:42
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function findMin(nums: number[]): number {
  // Think for yourself for 5 minutes...
  let left = 0
  let right = nums.length - 1

  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2)
    // 1. 如果中间数严格大于最右边的数，那么左边一定不存在最小值
    if (nums[mid] > nums[right]) {
      left = mid + 1
    } else if (nums[mid] < nums[right]) {
      // 2. 如果中间数严格小于最右边的值，那么右边一定不存在最小值
      right = mid
    } else {
      // 3. 如果中间数等于最右边的值，那么可以把右区间缩小一位
      right--
    }
  }

  return nums[left]
}
export default findMin
