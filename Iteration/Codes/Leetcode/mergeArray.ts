/*
 * Description: 合并两个有序数组
 * Url: https://leetcode.cn/problems/merge-sorted-array/
 * Created: 2023-02-28 19:06:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-10 22:06:11
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const mergeArray = (nums1: number[], m: number, nums2: number[], n: number): void => {
  // TODO
  let sorted = new Array(m + n).fill(0)
  let p1 = 0
  let p2 = 0
  let cur = 0
  while (p1 < m || p2 < n) {
    // 不行
    // if (nums1[p1] < nums2[p2]) {
    //   cur = nums1[p1++]
    // } else if (m === p1) {
    //   //
    //   cur = nums2[p2++]
    // } else if (n === p2) {
    //   cur = nums1[p1++]
    //   // p1++
    // } else {
    //   console.log('cur', cur)

    //   cur = nums2[p2++]
    // }
    if (p1 === m) {
      cur = nums2[p2++]
    } else if (p2 === n) {
      cur = nums1[p1++]
    } else if (nums1[p1] < nums2[p2]) {
      cur = nums1[p1++]
    } else {
      cur = nums2[p2++]
    }

    console.log('cur', cur)

    sorted[p1 + p2 - 1] = cur
  }
  for (let i = 0; i < sorted.length; i++) {
    nums1[i] = sorted[i]
  }
  console.log('sorted', sorted)
  console.log('nums1', nums1)
}

export default mergeArray
