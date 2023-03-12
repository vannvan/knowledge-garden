/*
 * Description: 2199：两栋颜色不同且距离最远的房子
 * Url: https://leetcode.cn/problems/two-furthest-houses-with-different-colors/
 * Tags: 贪心  数组
 * Created: 2023-03-12 17:42:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 17:50:11
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maxDistance(colors: number[]): number {
  // Think for yourself for 5 minutes...

  // q1. 要最远距离
  // q2. 以每个数为基准找最远的颜色不同的位置
  let max: number = 0

  for (let i = 0; i < colors.length; i++) {
    let l = i + 1
    while (l < colors.length) {
      if (colors[i] != colors[l]) {
        max = Math.max(max, l - i)
      }
      l++
    }
  }

  return max
}
export default maxDistance
