/*
 * Description: 238：除自身以外数组的乘积
 * Url: https://leetcode.cn/problems/product-of-array-except-self/
 * Tags: 数组  前缀和
 * Created: 2023-04-11 20:50:31
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-11 21:20:55
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function productExceptSelf1(nums: number[]): number[] {
  // Think for yourself for 5 minutes...
  // q1. 最朴实的算法，依次求除自身以外的乘积，或求所有数字的乘积除以当前数
  // q2. 但要求O(1)的空间复杂度和不能使用除法
  // 分别求出当前位置左右两侧的乘积list
  const n = nums.length
  let L = Array(n)
  let R = Array(n)

  L[0] = 1
  for (let i = 1; i < n; i++) {
    L[i] = nums[i - 1] * L[i - 1]
  }

  R[n - 1] = 1
  for (let i = n - 2; i >= 0; i--) {
    R[i] = nums[i + 1] * R[i + 1]
  }

  console.log(L, R)

  const ans = []

  // 对于索引i，他的除自身以外的乘积就是左侧的乘积*右侧的乘积
  for (let i = 0; i < n; i++) {
    // 会出现-0 所以这里用 == 处理一下
    ans[i] = L[i] * R[i] == 0 ? 0 : L[i] * R[i]
  }

  return ans
}

/**
 * 优化空间
 * @param nums
 */
function productExceptSelf(nums: number[]): number[] {
  const n = nums.length
  const ans = Array(n)
  ans[0] = 1
  // 先算前缀积
  for (let i = 1; i < n; i++) {
    ans[i] = nums[i - 1] * ans[i - 1]
  }

  // 最右侧从1开始
  let R = 1
  for (let i = n - 1; i >= 0; i--) {
    // 当前元素的除自身之外的积
    // 会出现-0 所以这里用 == 处理一下
    ans[i] = ans[i] * R == 0 ? 0 : ans[i] * R
    // 为下一个元素更新后缀积
    R *= nums[i]
  }

  return ans
}
export default productExceptSelf
