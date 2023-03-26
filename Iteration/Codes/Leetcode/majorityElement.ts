/*
 * Description: 169：多数元素
 * Url: https://leetcode.cn/problems/majority-element/
 * Tags: 数组  哈希表  分治  计数  排序
 * Created: 2023-03-26 19:49:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-26 20:01:29
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function majorityElement1(nums: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 多数元素指的是 次数大于 n/2的元素

  let ans: number = 0
  let max = 0
  const hash = {}

  for (const val of nums) {
    hash[val] = (hash[val] || 0) + 1
  }

  Object.keys(hash).forEach((key) => {
    if (hash[key] > max) {
      console.log(key, hash[key])
      max = hash[key]
      ans = Number(key)
    }
  })

  return ans
}
function majorityElement(nums: number[]): number {
  // 如果元素出现次数大于数组长度的一半，那最中间的那个元素一定是出现次数最多的元素

  nums.sort((a, b) => a - b)

  return nums[Math.floor(nums.length / 2)]
}
export default majorityElement
