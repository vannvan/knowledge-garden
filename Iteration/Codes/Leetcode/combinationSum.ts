/*
 * Description: 组合总和
 * Url: https://leetcode.cn/problems/combination-sum/
 * Tags: 数组  回溯
 * Created: 2023-03-07 16:18:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 16:52:04
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function combinationSum(candidates: number[], target: number): number[][] {
  // Think for yourself for 5 minutes...

  const res: number[][] = []

  const track: number[] = []

  let numSum: number = 0

  const backTrack = (nums: number[], startIndex: number) => {
    if (numSum > target) {
      return
    }

    if (numSum === target) {
      res.push([...track])
      return
    }
    // 剪枝 numSum + nums[i] <= target 当前值如果和numSum的和如果已经大于目标值就没必要进入下一次递归了
    for (let i = startIndex; i < nums.length && numSum + nums[i] <= target; i++) {
      numSum += nums[i]
      track.push(nums[i])

      // 同一元素可以重复使用，因此下次也可以是i当前元素
      backTrack(nums, i)

      numSum -= nums[i]
      track.pop()
    }
  }

  backTrack(candidates, 0)

  return res
}

export default combinationSum
