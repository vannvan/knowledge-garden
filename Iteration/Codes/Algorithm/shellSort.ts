/*
 * Description:  希尔排序
 * Created: 2023-02-21 22:28:44
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-22 09:25:23
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const shellSort = (nums: number[]) => {
  let { length } = nums
  let gap = Math.floor(nums.length / 2)
  while (gap >= 1) {
    for (let i = 0; i < length; i++) {
      for (let j = i; j >= gap; j = j - gap) {
        console.log(`第${i}轮`, j)
        // 若待插入值较小，则换位
        if (nums[j] < nums[j - gap]) {
          ;[nums[j], nums[j - gap]] = [nums[j - gap], nums[j]]
        }
      }
    }
    // console.log('---------gap减半前-------')
    gap = Math.floor(gap / 2)
  }
  // console.log('nums', nums)
  return nums
}

export default shellSort
