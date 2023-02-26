/*
 * Description: 左右指针查找指定元素,二分搜索
 * Created: 2023-02-20 18:54:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 15:47:28
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
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid - 1
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
  // 搜索区间为 [left, right]
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] < target) {
      // 搜索区间变为 [mid+1, right]
      left = mid + 1
    } else if (nums[mid] > target) {
      // 搜索区间变为 [left, mid-1]
      right = mid - 1
    } else if (nums[mid] == target) {
      // 收缩右侧边界
      right = mid - 1
    }
  }
  // 检查出界情况
  if (left >= nums.length || nums[left] != target) return -1
  return left
}

/**
 * 左闭右开
 * @param nums
 * @param target
 * @returns
 */
const left_bound_find_2 = (nums: number[], target: number) => {
  if (nums.length == 0) return -1
  let left = 0
  let right = nums.length
  while (left < right) {
    // 注意
    let mid = (left + right) / 2
    if (nums[mid] == target) {
      right = mid
    } else if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid // 注意
    }
  }

  if (left == nums.length) return -1
  return nums[left] == target ? left : -1
}

const left_bound_find_3 = (nums: number[], target: number) => {
  let left = 0
  let right = nums.length
  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] > target) {
      right = mid
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      return mid
    }
  }

  return -1
}

/**
 * 寻找右侧边界的二分搜索
 * @param nums
 * @param target
 * @returns
 */
const right_bound_find = (nums: number[], target: number) => {
  let left = 0,
    right = nums.length - 1
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] == target) {
      // 这里改成收缩左侧边界即可
      left = mid + 1
    }
  }
  // 这里改为检查 right 越界的情况
  if (right < 0 || nums[right] != target) return -1
  return right
}

const right_bound_find_2 = (nums: number[], target: number) => {
  let left = 0
  let right = nums.length
  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] === target) {
      left = mid + 1
    } else if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid
    }
  }

  return left - 1
}

export {
  find,
  left_bound_find,
  right_bound_find,
  left_bound_find_2,
  left_bound_find_3,
  right_bound_find_2,
}
