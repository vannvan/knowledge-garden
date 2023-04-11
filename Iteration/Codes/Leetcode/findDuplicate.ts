/*
 * Description: 287：寻找重复数
 * Url: https://leetcode.cn/problems/find-the-duplicate-number/
 * Tags: 位运算  数组  双指针  二分查找
 * Created: 2023-04-11 21:57:04
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-11 22:24:01
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function findDuplicate(nums: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 采用链表的思路，判断如果数组中存在重复元素，那么就存在一个能构成环的入口

  let slow = 0
  let fast = 0

  while (true) {
    slow = nums[slow]
    fast = nums[nums[fast]]
    if (slow == fast) {
      break
    }
  }

  // slow回到原点
  slow = 0
  while (slow != fast) {
    slow = nums[slow]
    fast = nums[fast]
  }
  return slow
}
export default findDuplicate
