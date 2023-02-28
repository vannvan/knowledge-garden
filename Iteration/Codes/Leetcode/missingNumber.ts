/*
 * Description: 丢失的数字
 * https://leetcode.cn/problems/missing-number/
 * Created: 2023-02-28 22:01:46
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-28 22:20:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const missingNumber = (nums: number[]): number => {
  // TODO
  const n: number = nums.length
  let total: number = Math.floor((n * (n + 1)) / 2) // 这个范围数字的和
  let arrSum = 0
  for (let i = 0; i < n; i++) {
    arrSum += nums[i] // 已有数字的和
  }

  return total - arrSum
}

export default missingNumber
