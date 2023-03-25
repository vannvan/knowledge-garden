/*
 * Description: 367：有效的完全平方数
 * Url: https://leetcode.cn/problems/valid-perfect-square/
 * Tags: 数学  二分查找
 * Created: 2023-03-25 22:18:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 22:23:53
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function isPerfectSquare1(num: number): boolean {
  // Think for yourself for 5 minutes...

  let left = 1
  let right = num / 2

  while (left < right) {
    if (left * left == num) {
      return true
    } else if (right * right === num) {
      return true
    } else {
      left++
      right--
    }
  }

  return false
}

function isPerfectSquare(num: number): boolean {
  // Think for yourself for 5 minutes...

  let left = 1
  let right = num

  while (left <= right) {
    let mid = Math.floor((right - left) / 2) + left
    const square = mid * mid
    if (square < num) {
      left = mid + 1
    } else if (square > num) {
      right = mid - 1
    } else {
      return true
    }
  }

  return false
}
export default isPerfectSquare
