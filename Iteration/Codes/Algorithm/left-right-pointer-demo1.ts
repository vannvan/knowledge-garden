/*
 * Description: 左右指针查找指定元素,二分搜索
 * Created: 2023-02-20 18:54:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-20 20:09:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 查询匹配的数,常规的
 * @param nums
 * @param target
 * @returns
 */
const find = (nums: number[], target: number) => {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2)
    if (nums[mid] < target) {
      left = mid + 1 // 向右移动，缩小边界
    } else if (nums[mid] > target) {
      right = mid - 1 // 向左移动，缩小边界
    } else {
      return mid // 此时nums[mid] = target 了，直接返回
    }
  }
  return -1
}

/**
 * 寻找左侧边界的二分搜索
 * @param nums
 * @param target
 */
const left_bound_find = (nums: number[], target: number) => {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] == target) {
      right = mid - 1 //收缩右侧边界
    } else if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      left = mid + 1
    }
  }
  // 检查出界情况
  if (left >= nums.length || nums[left] != target) return -1
  return left
}

/**
 * 寻找右侧边界的二分搜索
 * @param nums
 * @param target
 * @returns
 */
const right_bound_find = (nums: number[], target: number) => {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    let mid = left + (right - left) / 2
    if (nums[mid] == target) {
      left = mid + 1 //只有这里需要改
    } else if (nums[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  // 这里改为检查 right 越界的情况
  if (right < 0 || nums[right] != target) return -1
  return right
}
export { find, left_bound_find, right_bound_find }
