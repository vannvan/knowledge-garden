/*
 * Description: 560：和为 K 的子数组
 * Url: https://leetcode.cn/problems/subarray-sum-equals-k/
 * Tags: 数组  哈希表  前缀和
 * Created: 2023-06-02 21:57:27
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-06-02 22:22:13
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function subarraySum(nums: number[], k: number): number {
  // Think for yourself for 5 minutes...
  let count = 0
  for (let i = 0; i < nums.length; i++) {
    let sum = 0
    let j = i
    while (j < nums.length) {
      sum += nums[j]
      if (sum === k) count++
      j++
    }
  }

  return count
}

function subarraySumPref(nums: number[], k: number): number {
  let count = 0
  let hash = { 0: 1 }
  let prefixSum = 0
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i]
    if (hash[prefixSum - k] != undefined) {
      count += hash[prefixSum - k]
    }

    if (hash[prefixSum]) {
      hash[prefixSum]++
    } else {
      hash[prefixSum] = 1
    }
  }

  console.log(hash)

  return count
}
export { subarraySum, subarraySumPref }
