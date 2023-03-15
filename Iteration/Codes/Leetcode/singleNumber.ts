/*
 * Description: 136：只出现一次的数字
 * Url: https://leetcode.cn/problems/single-number/
 * Tags: 位运算  数组
 * Created: 2023-03-15 23:02:24
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-15 23:07:15
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function singleNumber(nums: number[]): number {
  // Think for yourself for 5 minutes...

  let single: number = 0
  for (const val of nums) {
    single ^= val
  }

  return single
}
export default singleNumber
