/*
 * Description: 441：排列硬币
 * Url: https://leetcode.cn/problems/arranging-coins/
 * Tags: 数学  二分查找
 * Created: 2023-03-25 22:32:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 22:35:20
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function arrangeCoins(n: number): number {
  // Think for yourself for 5 minutes...
  // q1. 能构成完整台阶的公式 total= ((k+1)*k)/2

  let left = 0
  let right = n
  while (left < right) {
    const mid = Math.floor((right - left + 1) / 2) + left
    if (mid * (mid + 1) <= 2 * n) {
      left = mid
    } else {
      right = mid - 1
    }
  }

  return left
}
export default arrangeCoins
