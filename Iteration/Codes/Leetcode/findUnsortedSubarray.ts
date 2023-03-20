/*
 * Description: 581：最短无序连续子数组
 * Url: https://leetcode.cn/problems/shortest-unsorted-continuous-subarray/
 * Tags: 栈  贪心  数组  双指针  排序  单调栈
 * Created: 2023-03-20 20:38:04
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-20 21:39:01
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// 不对
function findUnsortedSubarray1(nums: number[]): number {
  // Think for yourself for 5 minutes...
  // [2, 6, 4, 8, 10, 9, 15]  如果对 6, 4, 8, 10, 9] 排序，那么整个数组就会升序
  // [2, 4, 6, 6, 9, 10, 15]
  // q1. 找出的这个子数组排序后要使原数组是升序

  const sorted: number[] = [...nums].sort((a, b) => a - b)

  let left = 0
  let right = nums.length - 1

  let l, r

  while (left < right && !l && !r) {
    if (sorted[left] === nums[left]) {
      left++
    } else {
      l = left
    }
    if (sorted[right] === nums[right]) {
      right--
    } else {
      r = right
    }
  }

  if (!l || !r) {
    return 0
  }

  return r === l ? 0 : r - l + 1
}

function findUnsortedSubarray2(nums: number[]): number {
  let left = 0
  let right = 0
  let min = nums[nums.length - 1] // 最右边的数
  let max = nums[0] // 最左边的数

  // 从右往左 找左边界
  for (let i = nums.length - 1; i >= 0; i--) {
    min = Math.min(min, nums[i])
    if (nums[i - 1] > min) left = i - 1
  }

  // 从左往右 找右边界
  for (let i = 0; i < nums.length; i++) {
    max = Math.max(max, nums[i + 1])
    if (nums[i + 1] < max) right = i + 1
  }

  return right == left ? 0 : right - left + 1
}

function findUnsortedSubarray3(nums: number[]): number {
  const n: number = nums.length
  let max = -Number.MAX_VALUE
  let min = Number.MAX_VALUE

  let left = -1
  let right = -1
  //
  for (let i = 0; i < n; i++) {
    //从左到右维持最大值，寻找右边界
    if (max > nums[i]) {
      right = i
    } else {
      max = nums[i]
    }

    //从右到左维持最小值，寻找左边界begin
    if (min < nums[n - i - 1]) {
      left = n - i - 1
    } else {
      min = nums[n - i - 1]
    }
  }

  // 如果right走到头了还是初始值，说明本来就是升序数组
  return right === -1 ? 0 : right - left + 1
}

/**
 * 单调栈
 * @param nums
 */
function findUnsortedSubarray(nums: number[]): number {
  const stack: number[] = []
  let start: number = Infinity
  let end: number = -1
  let max: number = -Infinity

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack[stack.length - 1]] > nums[i]) {
      // 保存已经发现的最大值
      max = Math.max(max, nums[stack[stack.length - 1]])

      const curr = stack.pop()
      // start只能向前移动
      if (curr && curr < start) {
        start = curr
      }
    }
    if (nums[i] < max) end = i
    stack.push(i)
  }

  if (start > end) return 0
  return end - start + 1
}

export default findUnsortedSubarray
