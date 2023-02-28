/*
 * undefined: 删除有序数组中的重复项
 * https://leetcode.cn/problems/remove-duplicates-from-sorted-array/
 * Created: 2023-02-27 22:28:20
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-28 20:45:41
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const removeDuplicates = (nums: number[]): number => {
  // TODO
  const n = nums.length
  if (n === 0) {
    return 0
  }
  let fast = 1
  let slow = 1
  while (fast < n) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast]
      slow++
    }
    ++fast
  }
  console.log('nums', nums, 'slow', slow)
  return slow
}

export default removeDuplicates
