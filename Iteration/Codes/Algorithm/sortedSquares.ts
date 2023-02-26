/*
 * Description: 有序数组的平方
 * Created: 2023-02-26 15:53:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 16:08:28
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 有序数组的平方
 * 返回有序数组
 * @param nums
 * @returns
 */
const sortedSquares = (nums: number[]) => {
  let k = nums.length - 1
  let result: number[] = []
  for (let left = 0, right = nums.length - 1; left <= right; ) {
    // 如果右边更大，把较大的放到尾部，右边往左移
    if (nums[left] * nums[left] < nums[right] * nums[right]) {
      result[k] = nums[right] * nums[right]
      k--
      right--
    } else {
      result[k] = nums[left] * nums[left]
      k--
      left++
    }
  }
  return result
}

export default sortedSquares
