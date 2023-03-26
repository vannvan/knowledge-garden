/*
 * Description: 215：数组中的第K个最大元素
 * Url: https://leetcode.cn/problems/kth-largest-element-in-an-array/
 * Tags: 数组  分治  快速选择  排序  堆（优先队列）
 * Created: 2023-03-26 20:03:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-26 20:22:19
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
function swap(arr: number[], i: number, j: number) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function heapify(arr: number[], x: number, length: number) {
  let l = 2 * x + 1
  let r = 2 * x + 2
  let largest = x
  if (l < length && arr[l] > arr[largest]) {
    largest = l
  }
  if (r < length && arr[r] > arr[largest]) {
    largest = r
  }
  if (largest != x) {
    swap(arr, x, largest)
    // 递归交换以下的是否也建好堆.
    heapify(arr, largest, length)
  }
}

function findKthLargest(nums: number[], k: number): number {
  let size: number = nums.length
  // 建立堆
  for (let i = Math.floor(size / 2) + 1; i >= 0; i--) {
    heapify(nums, i, size)
  }
  // 排序
  for (let j = size - 1; j >= size - k; j--) {
    // 得到本次的最大，将最大的与最后一个交换位子
    swap(nums, 0, j)
    heapify(nums, 0, j)
  }
  return nums[size - k]
}

export default findKthLargest
