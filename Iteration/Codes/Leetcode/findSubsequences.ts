/*
 * Description: 递增子序列
 * Url: https://leetcode.cn/problems/non-decreasing-subsequences/
 * Tags: 位运算  数组  哈希表  回溯
 * Created: 2023-03-07 22:03:53
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 21:29:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function findSubsequences(nums: number[]): number[][] {
  // Think for yourself for 5 minutes...

  // 1. 至少两个元素
  // 2. 如果相邻两数相等也可以

  const res: number[][] = []

  const track: number[] = []

  const backTrack = (nums: number[], startIndex: number) => {
    if (track.length >= 2) {
      res.push([...track])
    }
    // 声明在这里表示仅在当前同一层里判断是否已使用过
    const usedSet: Set<number> = new Set()
    for (let i = startIndex; i < nums.length; i++) {
      const curNum = nums[i]
      // 如果当前数小于之前路径最后一个数说明不满足递增，且当同一层已使用过就不能再重复使用了
      if (curNum < track[track.length - 1] || usedSet.has(nums[i])) continue

      usedSet.add(nums[i])
      track.push(nums[i])

      backTrack(nums, i + 1)
      track.pop()
    }
  }

  backTrack(nums, 0)
  // console.log('res', res)

  return res
}
export default findSubsequences
