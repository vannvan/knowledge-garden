/*
 * Description: 561：数组拆分
 * Url: https://leetcode.cn/problems/array-partition/
 * Tags: 贪心  数组  计数排序  排序
 * Created: 2023-03-12 17:15:10
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 17:16:23
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function arrayPairSum(nums: number[]): number {
  // Think for yourself for 5 minutes...

  nums.sort((a, b) => a - b)
  let count: number = 0
  for (let i = 0; i < nums.length; i += 2) {
    count += nums[i]
  }
  return count
}

export default arrayPairSum
