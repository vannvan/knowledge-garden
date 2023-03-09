/*
 * Description: 219：存在重复元素 II
 * Url: https://leetcode.cn/problems/contains-duplicate-ii/
 * Tags: 数组  哈希表  滑动窗口
 * Created: 2023-03-09 20:54:24
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-09 20:59:46
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function containsNearbyDuplicate(nums: number[], k: number): boolean {
  // Think for yourself for 5 minutes...

  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    let a = map.get(nums[i])
    if (map.has(nums[i]) && Math.abs(i - a) <= k) {
      return true
    }
    map.set(nums[i], i)
  }

  return false
}
export default containsNearbyDuplicate
