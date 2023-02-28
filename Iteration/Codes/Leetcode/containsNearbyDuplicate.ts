/*
 * Description: 存在重复元素
 * https://leetcode.cn/problems/contains-duplicate-ii/
 * Created: 2023-02-28 21:34:47
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-28 21:48:17
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const containsNearbyDuplicate = (nums: number[], k: number): boolean => {
  // TODO
  let { length } = nums
  let map = new Map()
  for (let i = 0; i < length; i++) {
    if (map.has(nums[i]) && Math.abs(i - map.get(nums[i])) <= k) {
      return true
    }
    map.set(nums[i], i)
  }

  return false
}

export default containsNearbyDuplicate
