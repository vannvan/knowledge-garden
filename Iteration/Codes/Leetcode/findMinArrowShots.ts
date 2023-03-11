/*
 * Description: 452：用最少数量的箭引爆气球
 * Url: https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/
 * Tags: 贪心  数组  排序
 * Created: 2023-03-11 17:59:27
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 18:07:27
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function findMinArrowShots(points: number[][]): number {
  // Think for yourself for 5 minutes...
  points.sort((a, b) => {
    return a[1] - b[1]
  })

  let count = 1

  let lastEnd = points[0][1]
  for (let i = 0; i < points.length; i++) {
    let start = points[i][0]

    if (start > lastEnd) {
      count++
      lastEnd = points[i][1]
    }
  }

  return count
}
export default findMinArrowShots
