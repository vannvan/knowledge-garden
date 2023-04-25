/*
 * Description: 69：x 的平方根
 * Url: https://leetcode.cn/problems/sqrtx/
 * Tags: 数学  二分查找
 * Created: 2023-04-25 23:27:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-25 23:35:41
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function mySqrt(x: number): number {
  // Think for yourself for 5 minutes...
  let left = 1
  let right = x
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2)
    if (mid * mid <= x) {
      // 如果mid的平方小于等于x，mid+1的平方大于x，那么mid就是x的平方根
      if ((mid + 1) * (mid + 1) > x) {
        return mid
      }
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return 0
}
export default mySqrt
