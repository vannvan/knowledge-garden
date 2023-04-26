/*
 * Description: 用来转换代码格式
 * Created: 2023-03-31 21:25:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-26 23:52:55
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
function searchInsert(nums: number[], target: number): number {
  let left = 0
  let right = nums.length - 1
  //特殊判断
  if (nums[nums.length - 1] < target) {
    return nums.length
  }

  while (left < right) {
    const mid = Math.floor((right - left) / 2) + left
    let cur = nums[mid]
    // 此段不行，需要细品
    // if (cur > target) {
    //   right = mid - 1 // [left,mid-1]
    // } else {
    //   left = mid + 1 // [mid+1,right]
    // }
    if (cur < target) {
      left = mid + 1 // [mid+1,right]
    } else {
      right = mid // [left,mid]
    }
  }

  return left
}
