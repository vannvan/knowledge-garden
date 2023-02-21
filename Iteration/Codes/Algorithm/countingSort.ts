/*
 * Description: 计数排序
 * Created: 2023-02-21 16:37:02
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-21 17:58:52
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const findMaxValue = (nums: number[]) => {
  let max = nums[0]
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i]
    }
  }
  return max
}

const countingSort = (nums: number[]) => {
  if (nums.length < 2) return nums
  const maxValue = findMaxValue(nums)
  const counts = new Array(maxValue + 1)
  nums.forEach((num) => {
    if (!counts[num]) {
      counts[num] = 0
    }
    counts[num]++
  })

  let sortIndex = 0 // 从第一项开始
  counts.forEach((count, i) => {
    // 这个数可能出现了多次
    while (count > 0) {
      nums[sortIndex++] = i // i值就是sortIndex这个位置的原始值
      count-- // 上面每赋值一次就少一次
    }
  })
  console.log('nums', nums)
  return nums
}

export default countingSort
