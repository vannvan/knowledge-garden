/*
 * Description: 33：搜索旋转排序数组
 * Url: https://leetcode.cn/problems/search-in-rotated-sorted-array/
 * Tags: 数组  二分查找
 * Created: 2023-04-10 21:19:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-10 21:42:26
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function search(nums: number[], target: number): number {
  // Think for yourself for 5 minutes...
  // q1. 升序数组，在某个下标k的位置上进行了旋转，那一定有一部份还是有序的
  // q2. 如果按照O(n)的思路找数据，采用常规二分查找即可，但要求O(logn)，那么就要利用有序这个关键点缩小查找区间了

  const n = nums.length
  if (!n) return -1
  if (n === 1) return nums[0] === target ? 0 : -1

  let left = 0
  let right = n - 1
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2)
    // 记住找目标值这种题都要优先处理找到目标的逻辑
    if (nums[mid] === target) return mid
    // 前半部分有序，所以可以在前半部分找,
    if (nums[left] <= nums[mid]) {
      // 如果在 [left,mid)区间里，就收缩右边界，为什么是<num[mid], 因为等于上面都返回了呀
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else {
      // 如果在[right,mid)区间里，收缩左边界
      if (target <= nums[right] && target > nums[mid]) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }

  return -1
}
export default search
