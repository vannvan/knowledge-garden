/*
 * Description: 用来转换代码格式
 * Created: 2023-03-31 21:25:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-19 23:19:49
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
function removeDuplicates(nums: number[]): number {
  const n = nums.length
  let slow = 1
  let fast = 1
  // 从下标为1的数字跟前面比，每遇到i项与i-1位置的值相等时，用慢指针下标记录它
  while (fast < n) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast]
      slow++
    } else {
      fast++
    }
  }

  return slow
}
