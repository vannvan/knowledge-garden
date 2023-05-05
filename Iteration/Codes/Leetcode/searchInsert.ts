/*
 * Description: 搜索插入位置
 * Url: https://leetcode.cn/problems/search-insert-position/
 * Created: 2023-02-27 22:58:59
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-27 10:59:24
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const searchInsert = (nums: number[], target: number): number => {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] < target) {
      left = mid + 1 // [mid+1,right]
    } else if (nums[mid] > target) {
      right = mid - 1 // [left,mid-1]
    }
  }
  console.log('left', left, 'right', right)
  // return right + 1
  return left
}

function searchInsert1(nums: number[], target: number): number {
  let left = 0
  let right = nums.length - 1
  //特殊判断
  if (nums[nums.length - 1] < target) {
    return nums.length
  }

  while (left < right) {
    const mid = Math.floor((right - left) / 2) + left
    let cur = nums[mid]
    if (cur >= target) {
      right = mid // [left,mid-1]
    } else {
      left = mid + 1 // [mid+1,right]
    }
    // if (cur < target) {
    //   left = mid + 1 // [mid+1,right]
    // } else {
    //   right = mid // [left,mid]
    // }
  }
  return left
}

export default searchInsert
