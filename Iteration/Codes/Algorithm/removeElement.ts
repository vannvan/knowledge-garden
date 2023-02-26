/*
 * Description: 原地删除指定元素
 * Created: 2023-02-26 13:40:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 13:47:14
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const removeElement = (nums: number[], target: number) => {
  let slow = 0
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] != target) {
      nums[slow++] = nums[fast]
    }
  }
  return slow
}

const removeElement2 = (nums: number[], target: number) => {
  let slow = 1
  let fast = 1
  while (fast < nums.length) {
    if (nums[fast] != target) {
      nums[slow] = nums[fast]
      slow++
    }
    ++fast
  }
  return slow
}

export { removeElement, removeElement2 }
