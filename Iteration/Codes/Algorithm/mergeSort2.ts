/*
 * Description: 归并排序
 * Created: 2023-02-21 09:40:22
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-21 18:04:50
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const merge = (left: number[], right: number[]) => {
  let result: any[] = []

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  // 奇数个数字，左边或右边还剩一项元素的情况
  while (left.length) {
    result.push(left.shift())
  }
  while (right.length) {
    result.push(right.shift())
  }
  return result
}

const mergeSort = (nums: number[]) => {
  let { length } = nums

  if (length < 2) return nums
  let mid = Math.floor(length / 2)
  // 把无限数组拆成两半
  let left = nums.slice(0, mid)
  let right = nums.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

export default mergeSort
