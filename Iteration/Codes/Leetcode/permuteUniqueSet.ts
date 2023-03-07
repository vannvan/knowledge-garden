/*
 * Description: 全排列 II
 * Url: https://leetcode.cn/problems/permutations-ii/
 * Tags: 数组  回溯
 * Created: 2023-03-07 22:56:23
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 23:05:41
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function permuteUniqueSet(nums: number[]): number[][] {
  // Think for yourself for 5 minutes...

  const res: number[][] = []

  const track: number[] = []

  const used: boolean[] = []

  const backTrack = (nums: number[]) => {
    if (track.length == nums.length) {
      res.push([...track])
      return
    }

    const usedSet = new Set()
    for (let i = 0; i < nums.length; i++) {
      if (usedSet.has(nums[i]) || used[i]) continue

      usedSet.add(nums[i])
      used[i] = true
      track.push(nums[i])

      backTrack(nums)
      track.pop()
      used[i] = false
    }
  }

  backTrack(nums.sort())

  return res
}
export default permuteUniqueSet
