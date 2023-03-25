/*
 * Description: 453：最小操作次数使数组元素相等
 * Url: https://leetcode.cn/problems/minimum-moves-to-equal-array-elements/
 * Tags: 数组  数学
 * Created: 2023-03-25 22:42:32
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 22:48:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function minMoves(nums: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. n为nums的长度，每次操作会使n-1个元素增加1
  // q2. 反过来可以理解为  每次让1个元素减1
  // 可以转换为计算数组中所有元素都减少到数组元素最小值的次数

  const min = Math.min(...nums)

  let count: number = 0
  for (const num of nums) {
    count += num - min
  }

  return count
}
export default minMoves
