/*
 * Description: 组合总和 II Set去重的思路
 * Url: https://leetcode.cn/problems/combination-sum-ii/
 * Tags: 数组  回溯
 * Created: 2023-03-07 22:42:46
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 22:54:44
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function combinationSum2Set(candidates: number[], target: number): number[][] {
  // Think for yourself for 5 minutes...

  const res: number[][] = []

  const track: number[] = []

  let sumNum: number = 0

  const backTrack = (nums: number[], startIndex: number) => {
    if (sumNum > target) return

    if (sumNum === target) {
      res.push([...track])
      return
    }
    // 同一层去重
    const usedSet = new Set()

    for (let i = startIndex; i < nums.length; i++) {
      // 可以去掉这一行对比实际的效果
      if (usedSet.has(nums[i])) continue

      usedSet.add(nums[i])
      track.push(nums[i])
      sumNum += nums[i]

      backTrack(nums, i + 1)

      track.pop()
      sumNum -= nums[i]
    }
  }

  backTrack(candidates.sort(), 0)

  return res
}
export default combinationSum2Set
