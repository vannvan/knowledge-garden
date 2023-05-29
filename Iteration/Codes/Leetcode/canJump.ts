/*
 * Description: 55：跳跃游戏
 * Url: https://leetcode.cn/problems/jump-game/
 * Tags: 贪心  数组  动态规划
 * Created: 2023-03-11 18:14:36
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-29 21:35:22
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function canJump1(nums: number[]): boolean {
  // Think for yourself for 5 minutes...
  if ((nums.length = 1)) return true

  let furthest: number = 0 // 记录每一步最远的距离

  for (let i = 0; i < nums.length - 1; i++) {
    // 当前索引i+当前可以跳的步数num[i] 就是当前位置可以跳的最远的位置
    furthest = Math.max(furthest, i + nums[i])
    if (furthest <= i) {
      // 碰到0跳不动了
      return false
    }
  }
  console.log('furthest', furthest)
  return furthest >= nums.length - 1
}

function canJump(nums: number[]): boolean {
  if (nums.length === 1) return true
  let cover = 0
  for (let i = 0; i <= cover; i++) {
    cover = Math.max(cover, i + nums[i])
    if (cover >= nums.length - 1) {
      return true
    }
  }
  return false
}

function canJump2(nums: number[]): boolean {
  // Think for yourself for 5 minutes...

  let cur = nums[0]
  let i = 1
  for (; cur != 0 && i < nums.length; i++) {
    cur--
    if (cur < nums[i]) {
      cur = nums[i]
    }
  }

  return i == nums.length
}

export default canJump
