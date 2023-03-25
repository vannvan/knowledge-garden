/*
 * Description: 149：直线上最多的点数
 * Url: https://leetcode.cn/problems/max-points-on-a-line/
 * Tags: 几何  数组  哈希表  数学
 * Created: 2023-03-25 21:41:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 22:00:05
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maxPoints(points: number[][]): number {
  // Think for yourself for 5 minutes...
  // q1. 两点确定一条线
  // q2. 由于直接计算斜率可能会因为精度丢失导致计算不准确，因此借助第三个点
  // 由 k 确定的点判断 s1和s2相对于这个点的斜率是否相同
  const n = points.length

  let ans = 1
  for (let i = 0; i < n; i++) {
    let x = points[i]
    for (let j = i + 1; j < n; j++) {
      let y = points[j]
      let count = 2
      for (let k = j + 1; k < n; k++) {
        let p = points[k]
        let s1 = (y[1] - x[1]) * (p[0] - y[0])
        let s2 = (p[1] - y[1]) * (y[0] - x[0])
        if (s1 === s2) count++
      }
      ans = Math.max(count, ans)
    }
  }

  return ans
}
export default maxPoints
