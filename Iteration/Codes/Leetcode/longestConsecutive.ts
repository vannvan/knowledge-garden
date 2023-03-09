/*
 * Description: 128：最长连续序列
 * Url: https://leetcode.cn/problems/longest-consecutive-sequence/
 * Tags: 并查集  数组  哈希表
 * Created: 2023-03-09 22:06:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-09 22:45:55
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// 不对
function longestConsecutive(nums: number[]): number {
  // Think for yourself for 5 minutes...

  if (nums.length == 0) return 0

  const isContinuity = (set: Set<number>, val: number) => {
    if (set.has(val + 1) || set.has(val - 1)) {
      return true
    }
    return false
  }

  let count = 0

  const set: Set<number> = new Set(nums)
  const _nums = [...new Set(nums)]
  for (let i = 0; i < nums.length; i++) {
    // 排除重复数字
    if (isContinuity(set, _nums[i])) {
      count++
    }
    // set.add(_nums[i])
  }

  return count
}

function longestConsecutive1(nums: number[]): number {
  let set = new Set(nums)

  let max = 0
  for (const num of set) {
    if (!set.has(num - 1)) {
      let curNum = num
      let curCount = 1
      //  在所有数字中找比他大于1的数，找尽为止
      while (set.has(curNum + 1)) {
        curNum += 1
        curCount += 1
      }

      max = Math.max(curCount, max)
    }
  }

  return max
}
export default longestConsecutive
