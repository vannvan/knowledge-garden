/*
 * Description: 958：按奇偶排序数组 II
 * Url: https://leetcode.cn/problems/sort-array-by-parity-ii/
 * Tags: 数组  双指针  排序
 * Created: 2023-03-23 20:49:30
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-23 21:20:17
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function sortArrayByParityII1(nums: number[]): number[] {
  // Think for yourself for 5 minutes...
  //q1. 按照奇偶排序  先偶后奇

  const ans: number[] = Array(nums.length)

  let i = 0
  // 0 2 4 6
  for (const val of nums) {
    if (val % 2 === 0) {
      ans[i] = val
      i += 2
    }
  }

  i = 1
  // 1 3 5 7
  for (const val of nums) {
    if (val % 2 !== 0) {
      ans[i] = val
      i += 2
    }
  }

  return ans
}

const swap = (nums, i, j) => {
  const temp = nums[i]
  nums[i] = nums[j]
  nums[j] = temp
}

function sortArrayByParityII2(nums: number[]): number[] {
  const n: number = nums.length
  let j = 1 // 控制奇数位
  for (let i = 0; i < n; i += 2) {
    if (nums[i] % 2 == 1) {
      while (nums[j] % 2 === 1) {
        j += 2
      }

      swap(nums, i, j)
    }
  }

  return nums
}

function sortArrayByParityII(nums: number[]): number[] {
  const ans: number[] = []
  let evenIndex = 0
  let oddIndex = 1

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 == 0) {
      ans[evenIndex] = nums[i]
      evenIndex += 2
    } else {
      ans[oddIndex] = nums[i]
      oddIndex += 2
    }
  }

  return ans
}

export default sortArrayByParityII
