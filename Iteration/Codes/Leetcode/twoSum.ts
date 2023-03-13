/*
 * Description: 1：两数之和
 * Url: https://leetcode.cn/problems/two-sum/
 * Tags: 数组  哈希表
 * Created: 2023-03-13 21:51:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 22:02:47
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function twoSum(nums: number[], target: number): number[] {
  let map = new Map<number, number>()
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      const a = map.get(target - nums[i])
      if (a != undefined) {
        return [a, i]
      }
    }
    map.set(nums[i], i)
  }
  return [-1, -1]
}

export default twoSum
