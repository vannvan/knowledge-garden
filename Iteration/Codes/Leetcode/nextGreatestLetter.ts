/*
 * Description: 745：寻找比目标字母大的最小字母
 * Url: https://leetcode.cn/problems/find-smallest-letter-greater-than-target/
 * Tags: 数组  二分查找
 * Created: 2023-04-16 20:39:48
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-16 21:07:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function nextGreatestLetter(letters: string[], target: string): string {
  // Think for yourself for 5 minutes...
  const n = letters.length

  if (target >= letters[n - 1]) {
    return letters[0]
  }

  let left = 0
  let right = n - 1
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2)
    const mCode = letters[mid].charCodeAt(0)
    const tCode = target.charCodeAt(0)
    if (mCode > tCode) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  return letters[left]
}
export default nextGreatestLetter
