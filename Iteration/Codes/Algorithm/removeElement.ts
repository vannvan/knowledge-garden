/*
 * Description: 原地删除指定元素
 * Created: 2023-02-26 13:40:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-28 19:05:32
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
  let slow = 0
  let fast = 0
  while (fast < nums.length) {
    if (nums[fast] != target) {
      nums[slow] = nums[fast]
      slow++
    }
    ++fast
  }
  return slow
}

// 不对
const removeElement3 = (nums: number[], target: number) => {
  let leftIndex = 0
  let rightIndex = nums.length - 1
  while (leftIndex <= rightIndex) {
    // 找左边不等于val的元素
    while (leftIndex <= rightIndex && nums[leftIndex] != target) {
      ++leftIndex
    }
    // 找右边不等于val的元素
    while (leftIndex <= rightIndex && nums[rightIndex] == target) {
      --rightIndex
    }
    // 将右边不等于val的元素覆盖左边等于val的元素
    if (leftIndex < rightIndex) {
      nums[leftIndex++] = nums[rightIndex--]
    }
  }
  return leftIndex // leftIndex一定指向了最终数组末尾的下一个元素
}

export { removeElement, removeElement2, removeElement3 }
