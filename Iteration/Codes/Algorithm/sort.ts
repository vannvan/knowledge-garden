/*
 * Description: 排序算法
 * Created: 2023-04-15 12:37:44
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-15 13:11:47
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 冒泡
 * @param nums
 * @returns
 */
const bubbleSort = (nums: number[]): number[] => {
  const n = nums.length
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
  }
  return nums
}

/**
 * 选择排序
 * @param nums
 * @returns
 */
const selectSort = (nums: number[]): number[] => {
  const n = nums.length
  let minIndex = null

  for (let i = 0; i < n - 1; i++) {
    minIndex = i
    // 每次选择当前i位置之后的数字
    for (let j = i + 1; j < n; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = i
      }
    }

    ;[nums[i], nums[minIndex]] = [nums[minIndex], nums[i]]
  }

  return nums
}

/**
 * 插入排序
 * @param nums
 */
const insertSort = (nums: number[]): number[] => {
  const n = nums.length
  for (let i = 1; i < n; i++) {
    if (nums[i] < nums[i - 1]) {
      let tmp = nums[i] // 遇到了一个较小的数
      let p = i - 1 // 从当前前一位开始找tmp适合的位置
      while (p < n && tmp < nums[p]) {
        nums[p + 1] = nums[p]
        p--
      }
      nums[p + 1] = tmp
    }
  }

  return nums
}

const merge = (left: number[], right: number[]) => {
  const result = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while (left.length) {
    result.push(left.shift())
  }

  while (right.length) {
    result.push(right.shift())
  }

  return result
}

/**
 * 归并排序
 * @param nums
 */
const mergeSort = (nums: number[]): number[] => {
  const n = nums.length
  if (n < 2) return nums
  let mid = Math.floor(n / 2)
  // 把数组拆成两半
  let left = nums.slice(0, mid)
  let right = nums.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

/**
 * 快速排序
 * @param nums
 */
const quickSort = (nums: number[]): number[] => {
  const n = nums.length
  if (n < 2) return nums
  const pointIndex = Math.floor(n / 2)

  let left = [] // 左子树
  let right = [] // 右子树

  for (let i = 0; i < n; i++) {
    if (i != pointIndex) {
      if (nums[i] <= nums[pointIndex]) {
        left.push(nums[i])
      } else {
        right.push(nums[i])
      }
    }
  }

  // 左子树+根节点+右子树
  return quickSort(quickSort(left)).concat(nums[pointIndex], quickSort(right))
}

///
export { bubbleSort, selectSort, insertSort, mergeSort, quickSort }
