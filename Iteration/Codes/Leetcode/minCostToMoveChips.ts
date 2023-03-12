/*
 * Description: 1329：玩筹码
 * Url: https://leetcode.cn/problems/minimum-cost-to-move-chips-to-the-same-position/
 * Tags: 贪心  数组  数学
 * Created: 2023-03-12 17:31:21
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 17:39:04
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function minCostToMoveChips(position: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 挪两位不要钱，挪一位消耗1
  // q2. 那么考虑以奇数位为基准挪的话，偶数位就要消耗，反之奇数位就要消耗，针对两种情况的最小值计数，结果就是两者的最小值

  let odd: number = 0 // 奇数
  let even: number = 0 //偶数
  for (let i = 0; i < position.length; i++) {
    if (position[i] % 2 == 0) {
      odd++
    } else {
      even++
    }
  }

  return Math.min(odd, even)
}
export default minCostToMoveChips
