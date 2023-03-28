/*
 * Description: 4：寻找两个正序数组的中位数
 * Url: https://leetcode.cn/problems/median-of-two-sorted-arrays/
 * Tags: 数组  二分查找  分治
 * Created: 2023-03-28 21:55:53
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-28 22:07:25
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 两个数组都是升序数组，考虑先将数组合并

  const m = nums1.length
  const n = nums2.length

  const mergeArray = () => {
    let sorted = new Array(m + n).fill(0)
    let p1 = 0
    let p2 = 0
    let cur = 0
    while (p1 < m || p2 < n) {
      if (p1 === m) {
        cur = nums2[p2++]
      } else if (p2 === n) {
        cur = nums1[p1++]
      } else if (nums1[p1] < nums2[p2]) {
        cur = nums1[p1++]
      } else {
        cur = nums2[p2++]
      }
      sorted[p1 + p2 - 1] = cur
    }

    return sorted
  }

  const merged: number[] = mergeArray()

  let count = m + n

  if (count % 2 == 0) {
    return (merged[Math.floor(count / 2) - 1] + merged[Math.floor(count / 2)]) / 2.0
  } else {
    let mid = Math.floor(count / 2)
    return merged[mid]
  }
}
export default findMedianSortedArrays
