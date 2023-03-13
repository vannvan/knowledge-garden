/*
 * Description: 454：四数相加 II
 * Url: https://leetcode.cn/problems/4sum-ii/
 * Tags: 数组  哈希表
 * Created: 2023-03-13 20:45:13
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 20:55:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
  // Think for yourself for 5 minutes...'

  const map: Map<number, number> = new Map()
  let count: number = 0
  let tmpVal: number = 0
  for (let i of nums1) {
    for (let j of nums2) {
      tmpVal = map.get(i + j) || 0
      map.set(i + j, tmpVal + 1)
    }
  }

  for (let k of nums3) {
    for (let l of nums4) {
      tmpVal = map.get(0 - (k + l)) || 0
      if (tmpVal) {
        count += tmpVal
      }
    }
  }

  return count
}
export default fourSumCount
