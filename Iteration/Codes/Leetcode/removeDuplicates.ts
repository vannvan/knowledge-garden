/*
 * undefined: 删除有序数组中的重复项
 * Created: 2023-02-27 22:28:20
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-27 22:36:42
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const removeDuplicates = (nums: number[]): number => {
  // TODO
  let slow = 1
  let fast = 1

  while (fast < nums.length) {
    if (nums[fast] != nums[fast - 1]) {
      nums[slow] = nums[fast]
      slow++
    }
    fast++
  }
  return slow
}

export default removeDuplicates
