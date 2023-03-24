/*
 * Description: 137：只出现一次的数字 II
 * Url: https://leetcode.cn/problems/single-number-ii/
 * Tags: 位运算  数组
 * Created: 2023-03-24 22:42:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-24 22:43:08
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function singleNumberII(nums: number[]): number {
  // Think for yourself for 5 minutes...
  let result = 0
  for (let i = 0; i < 32; i++) {
    let sum = 0
    for (let j = 0; j < nums.length; j++) {
      let empty = (nums[j] >> i) & 1
      sum += empty
    }
    if (sum % 3 !== 0) {
      result |= 1 << i
    }
  }
  return result
}
export default singleNumberII
