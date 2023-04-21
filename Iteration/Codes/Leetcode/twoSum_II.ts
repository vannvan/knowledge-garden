/*
 * Description: 167：两数之和 II - 输入有序数组
 * Url: https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/
 * Tags: 数组  双指针  二分查找
 * Created: 2023-04-21 23:36:10
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-21 23:38:02
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function twoSum(numbers: number[], target: number): number[] {
  // Think for yourself for 5 minutes...
  let left = 0
  let right = numbers.length - 1
  while (left <= right) {
    const sum = numbers[left] + numbers[right]
    if (sum === target) {
      return [left + 1, right + 1]
    } else if (sum > target) {
      right--
    } else {
      left++
    }
  }

  return [-1, -1]
}
export default twoSum
