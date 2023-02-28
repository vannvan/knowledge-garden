/*
 * undefined: 搜索插入位置
 * https://leetcode.cn/problems/search-insert-position/
 * Created: 2023-02-27 22:58:59
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-27 23:23:40
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const searchInsert = (nums: number[], target: number): number => {
  // TODO

  // for (let i = 0; i < nums.length; i++) {
  //   if (target < nums[i] && target > nums[i - 1]) {
  //     console.log('1i', i, nums[i])
  //     return i - 1
  //   }
  //   if (target == nums[i]) {
  //     console.log('2i', i, nums[i])
  //     return i
  //   }

  //   if ((target > nums[i] && target < nums[i + 1]) || (target > nums[i] && !nums[i + 1])) {
  //     console.log('3i', i, nums[i])
  //     return i + 1
  //   }
  // }

  // return 0

  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] === target) return mid
    else if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid - 1
    }
  }
  return right + 1
}

export default searchInsert
