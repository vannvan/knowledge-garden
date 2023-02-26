/*
 * undefined: 存在重复元素
 * https://leetcode.cn/problems/contains-duplicate-ii/
 * Created: 2023-02-26 20:44:09
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 21:37:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function containsNearbyDuplicate(nums: number[], k: number): boolean {
  let set = new Set()

  for (let i = 0; i < nums.length; i++) {
    if (i > k) {
      set.delete(nums[i - k - 1])
    }
    if (set.has(nums[i])) {
      return true
    }
    set.add(nums[i])
  }
  return false
}

export default containsNearbyDuplicate
