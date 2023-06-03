/*
 * Description: 57：插入区间
 * Url: https://leetcode.cn/problems/insert-interval/
 * Tags: 数组
 * Created: 2023-06-03 21:34:20
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-06-03 21:46:17
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function insert(intervals: number[][], newInterval: number[]): number[][] {
  // Think for yourself for 5 minutes...
  const ans = []

  intervals.push(newInterval)

  intervals.sort((a, b) => a[0] - b[0])

  ans.push(...[intervals[0]])

  for (let i = 1; i < intervals.length; i++) {
    let last = ans.at(-1)
    let curr = intervals[i]
    // 如果当前点开始大于上一项的结束,那么当前区间就能作为一个新区间，
    if (curr[0] > last[1]) {
      ans.push(curr)
    } else if (curr[1] > last[1]) {
      // 如果当前点的结束大于上一项的结束，那么当前区间就包含上一个区间了，将上一个区间的结尾替代掉
      last[1] = curr[1]
    }
  }

  return ans
}
export default insert
