/*
 * Description: 274：H 指数
 * Url: https://leetcode.cn/problems/h-index/
 * Tags: 数组  计数排序  排序
 * Created: 2023-04-27 23:08:20
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-28 00:11:23
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const findMax = (nums: number[]) => {
  let max = nums[0]
  for (const val of nums) {
    max = Math.max(max, val)
  }
  return max
}

function hIndex1(citations: number[]): number {
  // Think for yourself for 5 minutes...
  let max = findMax(citations)
  const counts = Array(max).fill(0)
  citations.forEach((num) => {
    counts[num] = (counts[num] || 0) + 1
  })
  let total = 0
  for (let i = max; i >= 0; i--) {
    total += counts[i]
    if (total >= i) {
      return i
    }
  }
}

function hIndex(citations: number[]): number {
  citations.sort((a, b) => a - b)
  let h = 0
  let i = citations.length - 1
  while (i >= 0 && citations[i] > h) {
    h++
    i--
  }
  return h
}
export default hIndex
