/*
 * Description: 18：四数之和
 * Url: https://leetcode.cn/problems/4sum/
 * Tags: 数组  双指针  排序
 * Created: 2023-03-13 21:22:44
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 21:50:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function fourSum(nums: number[], target: number): number[][] {
  // Think for yourself for 5 minutes...

  // q1. 0 <= a, b, c, d < n
  // q2. a、b、c 和 d 互不相同
  // q nums[a] + nums[b] + nums[c] + nums[d] == target

  const resArr: number[][] = []

  nums.sort((a, b) => a - b)

  const n: number = nums.length
  for (let k = 0; k < n; k++) {
    if (nums[k] > target && nums[k] >= 0) {
      break
    }
    if (k > 0 && nums[k] == nums[k - 1]) {
      continue
    }

    for (let i = k + 1; i < n; i++) {
      if (nums[k] + nums[i] > target && nums[k] + nums[i] >= 0) {
        break
      }

      if (i > k + 1 && nums[i] == nums[i - 1]) {
        continue
      }

      let left = i + 1
      let right = n - 1

      while (right > left) {
        let total: number = nums[k] + nums[i] + nums[left] + nums[right]
        if (total > target) {
          right--
        } else if (total < target) {
          left++
        } else {
          resArr.push([nums[k], nums[i], nums[left], nums[right]])

          while (right > left && nums[right] === nums[right - 1]) right--
          while (right > left && nums[left] === nums[left + 1]) left++

          right--
          left++
        }
      }
    }
  }

  return resArr
}

/**
 *  nsum通用解法，支持2sum，3sum，4sum...等等
 *  时间复杂度分析：
 *  1. n = 2时，时间复杂度O(NlogN)，排序所消耗的时间。、
 *  2. n > 2时，时间复杂度为O(N^n-1)，即N的n-1次方，至少是2次方，此时可省略排序所消耗的时间。举例：3sum为O(n^2)，4sum为O(n^3)
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums: number[]) {
  // nsum通用解法核心方法
  function nSumTarget(nums: number[], n: number, start: number, target: number) {
    // 前提：nums要先排序好
    let res: number[][] = []
    if (n === 2) {
      res = towSumTarget(nums, start, target)
    } else {
      for (let i = start; i < nums.length; i++) {
        // 递归求(n - 1)sum
        let subRes = nSumTarget(nums, n - 1, i + 1, target - nums[i])
        for (let j = 0; j < subRes.length; j++) {
          res.push([nums[i], ...subRes[j]])
        }
        // 跳过相同元素
        while (nums[i] === nums[i + 1]) i++
      }
    }
    return res
  }

  function towSumTarget(nums: number[], start: number, target: number) {
    // 前提：nums要先排序好
    let res: number[][] = []
    let len = nums.length
    let left = start
    let right = len - 1
    while (left < right) {
      let sum = nums[left] + nums[right]
      if (sum < target) {
        while (nums[left] === nums[left + 1]) left++
        left++
      } else if (sum > target) {
        while (nums[right] === nums[right - 1]) right--
        right--
      } else {
        // 相等
        res.push([nums[left], nums[right]])
        // 跳过相同元素
        while (nums[left] === nums[left + 1]) left++
        while (nums[right] === nums[right - 1]) right--
        left++
        right--
      }
    }
    return res
  }
  nums.sort((a, b) => a - b)
  // n = 3，此时求3sum之和
  return nSumTarget(nums, 3, 0, 0)
}
export default fourSum
