/*
 * Description: 1047：K 次取反后最大化的数组和
 * Url: https://leetcode.cn/problems/maximize-sum-of-array-after-k-negations/
 * Tags: 贪心  数组  排序
 * Created: 2023-03-10 23:44:57
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 00:06:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function largestSumAfterKNegations(nums: number[], k: number): number {
  // Think for yourself for 5 minutes...

  nums.sort((a, b) => Math.abs(b) - Math.abs(a))
  // 将小于0的全部变为正数,第一次贪心
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0 && k > 0) {
      nums[i] = -nums[i]
      k--
    }
  }
  // 如果k还大于0，不断将最小的数取反
  while (k > 0) {
    nums[nums.length - 1] = -nums[nums.length - 1]
    k--
  }

  // 求和
  return nums.reduce((prev, curr) => prev + curr)
}
export default largestSumAfterKNegations
