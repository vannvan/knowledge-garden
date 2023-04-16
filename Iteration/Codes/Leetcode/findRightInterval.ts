/*
 * Description: 436：寻找右区间
 * Url: https://leetcode.cn/problems/find-right-interval/
 * Tags: 数组  二分查找  排序
 * Created: 2023-04-16 21:43:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-16 22:11:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function findRightInterval(intervals: number[][]): number[] {
  // Think for yourself for 5 minutes...
  // q1. 借助辅助数组，0下标存储原始start，1下标存储原始位置，对每个原始区间进行排序，
  const n = intervals.length
  const startIntervals = new Array(n).fill(0).map(() => new Array(2).fill(0))
  for (let i = 0; i < n; i++) {
    startIntervals[i][0] = intervals[i][0]
    startIntervals[i][1] = i
  }
  startIntervals.sort((o1, o2) => o1[0] - o2[0])

  const ans = Array(n).fill(0)
  for (let i = 0; i < intervals.length; i++) {
    let target = -1
    let left = 0
    let right = n - 1
    while (left <= right) {
      // 在根据start位置排好序的列表中找到对应大于i位置end值的那个end
      const mid = Math.floor(left + right - left / 2)
      // 需要收缩右侧，往左边找
      if (startIntervals[mid][0] >= intervals[i][1]) {
        target = startIntervals[mid][1]
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    ans[i] = target
  }

  return ans
}
export default findRightInterval
