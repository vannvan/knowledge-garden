/*
 * Description: 376：摆动序列
 * Url: https://leetcode.cn/problems/wiggle-subsequence/
 * Tags: 贪心  数组  动态规划
 * Created: 2023-03-10 20:53:39
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-10 22:49:37
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function wiggleMaxLength(nums: number[]): number {
  // Think for yourself for 5 minutes...
  if (nums.length <= 1) return nums.length

  let count: number = 1

  let curDiff = 0
  let preDiff = 0

  for (let i = 0; i < nums.length; i++) {
    curDiff = nums[i + 1] - nums[i]
    // 出现峰值,拐点
    if ((preDiff <= 0 && curDiff > 0) || (preDiff >= 0 && curDiff < 0)) {
      count++
      preDiff = curDiff
    }
  }

  return count
}
export default wiggleMaxLength
