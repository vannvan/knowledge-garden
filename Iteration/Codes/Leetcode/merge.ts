/*
 * Description: 56：合并区间
 * Url: https://leetcode.cn/problems/merge-intervals/
 * Tags: 数组  排序
 * Created: 2023-03-11 19:52:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 20:25:53
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function merge1(intervals: number[][]): number[][] {
  // Think for yourself for 5 minutes...

  if (intervals.length < 2) return intervals
  intervals.sort((a, b) => a[0] - b[0])

  const resArr: number[][] = []
  resArr[0] = [...intervals[0]] // 避免修改原intervals

  for (let i = 1, length = intervals.length; i < length; i++) {
    let interval: number[] = intervals[i]
    // 上一个区间应该从已合并的区间内找
    let last: number[] = resArr[resArr.length - 1]
    // 如果下一个区间的start<=上一个区间的end
    if (interval[0] <= last[1]) {
      last[1] = Math.max(interval[1], last[1])
    } else {
      resArr.push([...intervals[i]])
    }
  }
  return resArr
}

function merge(intervals: number[][]): number[][] {
  if (intervals.length < 2) return intervals

  intervals.sort((a, b) => a[1] - b[1])

  const res: number[][] = []

  // 先把第一个区间放进去
  res.push([...intervals[0]])

  for (let i = 1; i < intervals.length; i++) {
    let cur: number[] = intervals[i]

    let last = res[res.length - 1]

    if (cur[0] <= last[1]) {
      last[1] = Math.max(cur[1], last[1])
    } else {
      res.push([...intervals[i]])
    }
  }

  return res
}

export default merge
