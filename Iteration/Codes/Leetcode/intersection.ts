/*
 * Description: 349：两个数组的交集
 * Url: https://leetcode.cn/problems/intersection-of-two-arrays/
 * Tags: 数组  哈希表  双指针  二分查找  排序
 * Created: 2023-03-13 20:09:58
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 20:15:50
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function intersection(nums1: number[], nums2: number[]): number[] {
  // Think for yourself for 5 minutes...
  //

  const longNums: number[] = nums1.length > nums2.length ? nums1 : nums2

  const shortNums: number[] = nums1.length < nums2.length ? nums1 : nums2

  const res: Set<number> = new Set()
  for (const a of longNums) {
    if (shortNums.includes(a)) {
      res.add(a)
    }
  }
  return [...res]
}
export default intersection
