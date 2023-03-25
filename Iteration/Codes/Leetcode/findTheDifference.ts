/*
 * Description: 389：找不同
 * Url: https://leetcode.cn/problems/find-the-difference/
 * Tags: 位运算  哈希表  字符串  排序
 * Created: 2023-03-25 22:10:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 22:14:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function findTheDifference(s: string, t: string): string {
  // Think for yourself for 5 minutes...

  let left = 0
  let right = 0
  for (const s1 of s) {
    left ^= s1.charCodeAt(0)
  }

  for (const t1 of t) {
    right ^= t1.charCodeAt(0)
  }
  console.log(left, right)

  return String.fromCharCode(left ^ right)
}
export default findTheDifference
