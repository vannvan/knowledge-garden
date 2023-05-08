/*
 * Description: 275：H 指数 II
 * Url: https://leetcode.cn/problems/h-index-ii/
 * Tags: 数组  二分查找
 * Created: 2023-05-08 23:23:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-08 23:33:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function hIndex(citations: number[]): number {
  // Think for yourself for 5 minutes...
  let left = 0
  let right = citations.length - 1
  const n = citations.length

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    if (citations[mid] >= n - mid) {
      right = mid // [left,mid]
    } else {
      left = mid + 1 // [mid + 1,right]
    }
  }

  return citations[left] >= n - left ? n - left : 0
}
export default hIndex
