/*
 * Description: 回文数
 * Url: https://leetcode.cn/problems/palindrome-number/
 * Tags: 数学
 * Created: 2023-03-08 14:57:45
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 14:59:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function isPalindromeNumber(x: number): boolean {
  // Think for yourself for 5 minutes...

  let xStr = String(x)

  let left = 0
  let right = xStr.length - 1

  while (left < right) {
    if (xStr[left] != xStr[right]) {
      return false
    }
    left++
    right--
  }

  return true
}
export default isPalindromeNumber
