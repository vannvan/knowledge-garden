/*
 * Description: 494：目标和
 * Url: https://leetcode.cn/problems/target-sum/
 * Tags: 数组  动态规划  回溯
 * Created: 2023-03-08 23:02:20
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 16:25:48
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// 此版本超出限制
function findTargetSumWays1(nums: number[], target: number): number {
  // Think for yourself for 5 minutes...

  // q1. 第一项元素的前面可以加符号
  // q2. track的长度==nums.length 的时候表示所有数和能加符号的位置都满足了

  let count = 0

  const track: string[] = []

  const symbol: string[] = ['-', '+']

  const formatSolute = (track: string[]): number => {
    let res: number = 0
    for (let i = 0; i < track.length; i++) {
      res += Number(track[i])
    }
    return res
  }

  const backTrack = (nums: number[], startIndex: number) => {
    // console.log('track', track)

    if (track.length === nums.length) {
      // console.log('track', track)
      const res = formatSolute(track)
      if (res == target) {
        count++
      }
    }

    for (let i = startIndex; i < nums.length; i++) {
      for (let j = 0; j < symbol.length; j++) {
        const cur = `${symbol[j]}${nums[i]}`
        track.push(cur)
        backTrack(nums, i + 1)
        track.pop()
      }
    }
  }

  backTrack(nums, 0)

  return count
}

function findTargetSumWays(nums: number[], target: number): number {
  let count = 0

  const backTrack = (nums: number[], index: number, sum: number) => {
    if (index === nums.length) {
      if (sum === target) {
        count++
      }
    } else {
      backTrack(nums, index + 1, sum + nums[index])
      backTrack(nums, index + 1, sum - nums[index])
    }
  }

  backTrack(nums, 0, 0)

  return count
}

/**
 * 动态规划
 * @param nums
 * @param target
 */
function findTargetSumWaysByDP(nums: number[], target: number): number {
  const sum: number = nums.reduce((prev, curr) => prev + curr)

  // x = (target + sum) / 2
  if (Math.abs(target) > sum) return 0 // 此时没有答案
  if ((target + sum) % 2 == 1) return 0 // 此时没有方案

  const bagSize = (target + sum) / 2

  const dp: number[] = Array(bagSize + 1).fill(0)
  dp[0] = 1
  for (let i = 0; i < nums.length; i++) {
    for (let j = bagSize; j >= nums[i]; j--) {
      dp[j] += dp[j - nums[i]]
    }
  }
  return dp[bagSize]
}

export { findTargetSumWays, findTargetSumWaysByDP }
