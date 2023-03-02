/*
 * Description: 反转字符串
 * Url: https://leetcode.cn/problems/reverse-string/
 * Created: 2023-03-02 19:11:53
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-02 19:17:28
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 Do not return anything, modify s in-place instead.
 */
function reverseString(s: string[]): string[] {
  let left = 0
  let right = s.length - 1
  while (left < right) {
    // ;[s[left], s[right]] = [s[right], s[left]]
    let tmp = s[left]
    s[left] = s[right]
    s[right] = tmp
    left++
    right--
  }

  return s
}
export default reverseString
