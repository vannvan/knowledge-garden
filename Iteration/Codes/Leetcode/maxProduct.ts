/*
 * Description: 152：乘积最大子数组
 * Url: https://leetcode.cn/problems/maximum-product-subarray/
 * Tags: 数组  动态规划
 * Created: 2023-04-09 21:48:09
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-09 23:08:02
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maxProduct(nums: number[]): number {
  // Think for yourself for 5 minutes...

  const n = nums.length
  let max = Number.MIN_SAFE_INTEGER
  let imax = 1
  let imin = 1
  for (let i = 0; i < n; i++) {
    if (nums[i] < 0) {
      ;[imax, imin] = [imin, imax]
    }

    imax = Math.max(imax * nums[i], nums[i])
    imin = Math.min(imin * nums[i], nums[i])

    max = Math.max(imax, max)
  }

  return max
}

export default maxProduct
