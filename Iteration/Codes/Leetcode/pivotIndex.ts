/*
 * Description: 724：寻找数组的中心下标
 * Url: https://leetcode.cn/problems/find-pivot-index/
 * Tags: 数组  前缀和
 * Created: 2023-03-22 22:50:35
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-22 23:37:31
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// 不对 [-1, -1, -1, -1, -1, 0]
function pivotIndex1(nums: number[]): number {
  // Think for yourself for 5 minutes...

  // q1. 左侧所有元素的和等于右侧所有元素的和

  const n: number = nums.length

  const sumFn = (arrs: number[]) => (arrs.length ? arrs.reduce((prev, curr) => prev + curr) : 0)

  for (let i = -2; i < n; i++) {
    if (sumFn(nums.slice(0, i + 1)) === sumFn(nums.slice(i + 2, n))) {
      console.log('成立', i)
      return i + 1
    }
  }

  return -1
}

// 正确
function pivotIndex2(nums: number[]): number {
  const total = nums.reduce((a, b) => a + b, 0)
  let sum = 0

  // 当遍历到i元素时，设其左侧为sum ，则其右侧为 total-nums[i]-sum 即s*sum+numssi=total
  for (let i = 0; i < nums.length; i++) {
    // if (2 * sum + nums[i] == total) {
    //   return i
    // }
    // sum += nums[i]

    sum += nums[i]
    if (total - sum === sum - nums[i]) return i
  }

  return -1
}

// 容易理解的版本
function pivotIndex(nums: number[]): number {
  const length: number = nums.length
  const sum: number = nums.reduce((a, b) => a + b)
  let leftSum: number = 0
  for (let i = 0; i < length; i++) {
    const rightSum: number = sum - leftSum - nums[i]
    if (leftSum === rightSum) return i
    leftSum += nums[i]
  }
  return -1
}
export default pivotIndex
