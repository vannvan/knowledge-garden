/*
 * Description: 删除有序数组中的重复项
 * Url: https://leetcode.cn/problems/remove-duplicates-from-sorted-array/
 * Created: 2023-02-27 22:28:20
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-16 23:56:04
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const removeDuplicates1 = (nums: number[]): number => {
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
  return slow
}

const removeDuplicates2 = (nums: number[]): number => {
  const n = nums.length
  if (n === 0) {
    return 0
  }
  let j = 1
  // nums[0,j) 有序且值唯一
  // j表示下一个需要赋值的元素
  for (let i = 1; i < n; i++) {
    if (nums[i] !== nums[j - 1]) {
      nums[j] = nums[i]
      j++
    }
  }
  return j
}

const removeDuplicates = (nums: number[]): number => {
  const n = nums.length
  if (n === 0) {
    return 0
  }
  let j = 0
  // nums[0,j] 有序且值唯一
  // j表示上一个赋值的元素的下标
  for (let i = 1; i < n; i++) {
    if (nums[i] !== nums[j]) {
      j++
      nums[j] = nums[i]
    }
  }
  return j + 1
}

export default removeDuplicates
