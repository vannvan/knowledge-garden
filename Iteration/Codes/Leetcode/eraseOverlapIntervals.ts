/*
 * Description: 435：无重叠区间
 * Url: https://leetcode.cn/problems/non-overlapping-intervals/
 * Tags: 贪心  数组  动态规划  排序
 * Created: 2023-03-11 17:32:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 17:50:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function eraseOverlapIntervals(intervals: number[][]): number {
  // Think for yourself for 5 minutes...

  if (intervals.length == 0) return 0

  // 先按照end给原区间数组排个序
  intervals.sort((a, b) => {
    return a[1] - b[1]
  })

  // count 记录可以正常续上的区间段[1,2],[2,3]可以续上,[1,2],[1,3] 由于后面的start大于前面的end，所以续不上
  // 记录可以续上的，不能连续的就是 n-count了

  let lastSectionEnd = intervals[0][1] // 上一个区间的end
  let count = 1
  for (let i = 0; i < intervals.length; i++) {
    let start = intervals[i][0]
    // 如果下一个区间的start>=上一个区间的end，那么两个区间不重叠
    if (start >= lastSectionEnd) {
      lastSectionEnd = intervals[i][1]
      count++
    }
  }

  return intervals.length - count
}
export default eraseOverlapIntervals
