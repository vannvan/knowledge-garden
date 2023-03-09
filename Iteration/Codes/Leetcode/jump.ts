/*
 * Description: 45：跳跃游戏 II
 * Url: https://leetcode.cn/problems/jump-game-ii/
 * Tags: 贪心  数组  动态规划
 * Created: 2023-03-09 22:48:07
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-09 23:14:51
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 反向找到出发位置
 * @param nums
 * @returns
 */
function jump1(nums: number[]): number {
  // Think for yourself for 5 minutes...

  // q1. 直接跳nums[i]长度会不会超过
  // q2. 可以跳 0 - num[i]的任意位置
  let minSteps: number = 0
  let position = nums.length - 1
  while (position > 0) {
    for (let i = 0; i < position; i++) {
      // 说明当前位置直接跳不到,下一步要从当前位置出发
      if (i + nums[i] >= position) {
        minSteps += 1
        position = i
        break
      }
    }
  }

  return minSteps
}

/**
 * 正向找 可以跳最大一步的位置
 * @param nums
 * @returns
 */
function jump(nums: number[]): number {
  let minSteps: number = 0

  let end = 0
  let maxPosition = 0
  for (let i = 0; i < nums.length - 1; i++) {
    maxPosition = Math.max(maxPosition, i + nums[i])
    if (i === end) {
      console.log('i', i)
      end = maxPosition
      minSteps++
    }
  }

  return minSteps
}

export default jump
