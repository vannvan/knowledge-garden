/*
 * Description: 1646：第 k 个缺失的正整数
 * Url: https://leetcode.cn/problems/kth-missing-positive-number/
 * Tags: 数组  二分查找
 * Created: 2023-04-17 21:26:31
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-17 21:42:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function findKthPositive(arr: number[], k: number): number {
  // Think for yourself for 5 minutes...
  let left = 1
  let count = 0

  while (count < k) {
    if (count === k) return left - 1
    if (arr.indexOf(left) < 0) {
      count++
    }
    left++
  }

  return left - 1
}
export default findKthPositive
