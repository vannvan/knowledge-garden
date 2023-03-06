/*
 * Description: 组合总和 II
 * Url: https://leetcode.cn/problems/combination-sum-ii/
 * Tags: 数组  回溯
 * Created: 2023-03-06 23:24:45
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-06 23:31:19
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function combinationSum2(candidates: number[], target: number): number[][] {
  // Think for yourself for 5 minutes...

  const res: number[][] = []

  const track: number[] = []

  let subNum: number = 0

  const backTrack = (nums: number[], startIndex: number) => {
    if (subNum === target) {
      res.push([...track])
    }

    if (subNum > target) {
      return
    }

    for (let i = startIndex; i < nums.length; i++) {
      if (i > startIndex && nums[i] == nums[i - 1]) continue

      track.push(nums[i])

      subNum += nums[i]
      backTrack(nums, i + 1)
      track.pop()
      subNum -= nums[i]
    }
  }

  backTrack(candidates.sort(), 0)

  return res
}
export default combinationSum2
